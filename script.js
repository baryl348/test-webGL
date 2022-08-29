import {initializeWebGl} from './initialize-web-gl.js';
import {initializeShaders} from './initialize-shaders.js'
import {initializeBuffer} from './initialize-buffer.js'

const getElementCanvas = document.querySelector('#glcanvas');

window.addEventListener('load', (event) => start(event));

export let GL = null;

const start = async () => {
   GL = await initializeWebGl(getElementCanvas);
   GL.viewport(0, 0, getElementCanvas.width, getElementCanvas.height);
   initializeShaders(GL)
   initializeBuffer()
}

