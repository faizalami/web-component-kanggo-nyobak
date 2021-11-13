import './components/ImageFigure'

const imageFigure = document.createElement('image-figure')
imageFigure.setAttribute('src', '/pictures/logo.png')
imageFigure.setAttribute('alt', 'Test')
imageFigure.setAttribute('caption', 'Test')
document.body.appendChild(imageFigure)
