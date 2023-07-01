# SW5e
The SW5e site converted into the ME5e codebase

## Working on the site
Requirements: [Node.js](https://nodejs.org/)

``` bash
# clone the repo
$ git clone https://github.com/queryluke/masseffect-5e.git

# cd to code
$ cd masseffect-5e

# make .env file
$ touch .env

# add the following to the .env file
you can change the version to any of the versions available in the data repo
```env
VERSION=v1.0.0
API_BASE_URL=https://omnibrew.github.io/sw5e-data/
```

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev


For detailed explanation on how things work, check out the [Nuxt.js](https://github.com/nuxt/nuxt.js) and [Vuetify.js](https://vuetifyjs.com/) documentation.
__NOTE: This repo uses Vue, Nuxt, and Vuetify 2.x__

## SW5e Data
The data api is located at https://omnibrew.github.io/sw5e-data/[VERSION]

If you want to edit and work on the data locally and see how it renders in the site, you can clone that repo: https://github.com/OmniBrew/sw5e-data

To see your changes locally, you'll want to symlink the data repo into this repo __IN THE `static` dir!!!__.

Then you can load the site with `yarn run local`

__Windows__ (note: you'll probably need to run the cmd as an administrator)
```bash
mklink /D $PATH_TO_THIS_REPO\static\.data $PATH_TO_DATA_REPO\docs\$VERISON

## e.g.
mklink /D E:\Sites\sw5e\static\.data E:\Sites\sw5e-data\docs\v100
```

__Linux/Mac__
```bash
ln -s $PATH_TO_DATA_REPO/docs/$VERISON $PATH_TO_THIS_REPO/static/.data

## e.g.
ln -s ~/Sites/sw5e-data/docs/v100 ~/Sites/sw5e/static/.data
```

__NOTE!__ You will need to remove the symlink before running `nuxt generate`, Windows `rmdir static/.data` or Linux/Mac `unlink static/.data`

## Amplify (AWS Hosting)

This is only required if you plan on working on aspects of the site that utilize the SW5e AWS hosted components.

1. Install the [Amplify CLI](https://docs.amplify.aws/cli/)
2. [Configure your account](https://docs.amplify.aws/cli/start/install/#option-2-follow-the-instructions) (will need to contact the ME5e developers for an AWS account)
  - Note, if you already have an amplify profile configured, [see this guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)
3. In the root of this repo: `amplify pull --appId dqx4jr4x8mav --envName dev` 
