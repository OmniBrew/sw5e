#!/usr/bin/env ruby

require 'json'
require 'yaml'
require 'csv'
require 'net/http'
Encoding.default_external = Encoding::UTF_8

output_type = "yaml"

drones = {
  "combat" => "The drone has X[dd] health. On your turn, it moves to an enemy of your choosing and makes a melee attack. On a success, the target takes 1[dd] shocking damage. Deals double damage to shields. The drone'ss attack can detonate targets.",
  "defense" => "",
  "support" => "The drone has 2X healing serums. On your turn, it moves to target creature of your choosing and injects any number of healing serums into their arm. The target is healed for Y[dd] damage, where Y is the number of serums used. Support Drone lasts 1 minute or until all serums are used.",
  "kamakaze" => "",
}

def set_features(string)
  features = []
  if string
    string.split(',').each do |f|

      feature = {
        'text' => f,
        'add-text' => '',
        'level' => ''
      }

      f.match(/\(.*?\)/) do |m|
        code = m.to_s
        ability = f.sub(/#{Regexp.escape(code)}/,"")
        feature['text'] = ability
        feature['add-text'] = code == "(adv)" ? "Select an Advancement Option" : code

        if code.match(/\([\d]\)/)
          feature['level'] = code.gsub(/(\(|\))/,"")
        end
      end

      features << feature

    end
  end
  features
end

def config_races(model)
  abilities = []
  model["abilities"].split("--").each do |a|
    separated = a.split(":")
    ability = {
      'title' => separated[0].strip,
      'text' => separated[1] ? separated[1].strip : ''
    }
    abilities << ability
  end
  model["abilities"] = abilities
  model
end

def insert_dd(string, die)
  if string
    string.gsub(/\[dd\]/,die.to_s)
  end
end

def insert_higher_level_text(type, die, tp, level)
  hlt = {
    "cantrip" => "The spell's damage increases by 1[dd] when you reach 5th level (2[dd]), 11th level (3[dd]), and 17th level (4[dd]).",
    "spell" => "When you cast this spell using a spell slot of [spellLevelp1] level or higher, the damage increases by 1[dd] for each slot level above [spellLevel]",
    "tech" => "You can spend up to [maxTP] TP.",
  }
  case type
  when "spell"
    if level.to_i > 0
      text = insert_dd(hlt["spell"], die)
      plus1 = level.to_i + 1
      text = text.gsub(/\[spellLevelp1\]/, plus1.to_s).gsub(/\[spellLevel\]/, level)
    else
      text = insert_dd(hlt["cantrip"], die)
    end
  when "tech"
    if tp
      text = hlt["tech"].gsub(/\[maxTP\]/, tp)
    end
  else
    text = ''
  end
  text
end

def create_class_list(model)
  classes = ['adept','engineer','infiltrator','sentinel','soldier','vanguard'];
  output = []
  classes.each do |c|
    if model[c]
      if !model[c].empty?
        part = model[c] == 'x' ? c.capitalize : model[c].gsub(/(\[|\])/,'') + ' ' + c.capitalize + ' only'
        output << part
      end
    end
  end
  output.join(', ')
end

def config_abilities(model)
  model["mechanic"] = insert_dd(model["mechanic"], model["die-type"])
  model["adv-option-1"] = insert_dd(model["adv-option-1"], model["die-type"])
  model["adv-option-2"] = insert_dd(model["adv-option-2"], model["die-type"])
  model["higher-level"] = insert_higher_level_text(model["type"], model["die-type"], model["max-tp"], model["level"])
  model["class-list"] = create_class_list(model)
  model
end

def generate_model(headers)
  model = {}
  headers.each do |h|
    snake = h.gsub(" ","-").downcase 
    model[snake] = ""
  end
  model
end

def generate_config_file(page, output)
  uri = URI(page[:url])
  resp = Net::HTTP.get_response(uri)

  csv = CSV.parse(resp.body)

  model = generate_model(csv[0])
  csv.delete_at(0)
  collection = []

  csv.each do |line|
    interator = 0
    dup_model = model.dup
    dup_model.each_key do |key|
      dup_model[key] = line[interator]
      interator = interator + 1
    end

    case page[:type]
    when "races"
      race = dup_model["race"].gsub(" ","-").downcase
      directory = "races/#{race}"
      Dir.mkdir(directory) unless File.exists?(directory)
      File.open("#{directory}/index.html", "w") do |f|
        f.write("---\nlayout: race\ntitle: Races - #{dup_model["race"]}\nrace: #{dup_model["race"]}\n---")
      end
      dup_model = config_races(dup_model)
    when "classes"
      c = dup_model["class"].gsub(" ","-").downcase
      directory = "classes/#{c}"
      Dir.mkdir(directory) unless File.exists?(directory)
      File.open("#{directory}/index.html", "w") do |f|
        f.write("---\nlayout: class\ntitle: Classes - #{dup_model["class"]}\nclass: #{dup_model["class"]}\n---")
      end
    when "subclasses"
      dup_model["2"] = set_features(dup_model["2"])
      dup_model["6"] = set_features(dup_model["6"])
      dup_model["10"] = set_features(dup_model["10"])
      dup_model["14"] = set_features(dup_model["14"])
      dup_model["18"] = set_features(dup_model["18"])
    when "abilities"
      dup_model = config_abilities(dup_model)
    else
      if dup_model.has_key?("features")
        dup_model["features"] = set_features(dup_model["features"])
      end
    end

    collection << dup_model
  end


  puts "working on #{page[:type]}"
  File.open("data/#{page[:type]}.json", "wb") {|f| f.write JSON.pretty_generate(collection) }

end

pages = [
  {
    :type => "races",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=0&single=true&output=csv"
  },
  {
    :type => "classes",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=781894233&single=true&output=csv"
  },
  {
    :type => "subclasses",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1874613976&single=true&output=csv"
  },
  {
    :type => "abilities",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=686320782&single=true&output=csv",
  },
  {
    :type => "weapons",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1499213134&single=true&output=csv",
  },
  {
    :type => "heavy_weapons",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1966803402&single=true&output=csv",
  },
  {
    :type => "adept",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1555546585&single=true&output=csv"
  },
  {
    :type => "engineer",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1365181965&single=true&output=csv"
  },
  {
    :type => "infiltrator",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=378282529&single=true&output=csv"
  },
  {
    :type => "soldier",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1216928408&single=true&output=csv"
  },
  {
    :type => "vanguard",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=854116423&single=true&output=csv"
  },
].each do |p|
  generate_config_file(p, output_type)
end