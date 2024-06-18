function getImage (imgUrl) {
  try {
    return require(imgUrl)
  } catch (e) {
    console.warn('Unable to find an image at the following URL:', imgUrl)
    return require('~/assets/images/sw5e-logo.84b4d7ed.png') // TODO: Set default fallback image. Maybe through a switch or seperate function.
  }
}

export default getImage
