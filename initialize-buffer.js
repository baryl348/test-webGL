import {GL} from './script.js';
import {loadIdentity, mvTranslate, setMatrixUniforms } from './matrix.js';
import {globalVertexPositionAttribute} from './initialize-shaders.js'

export let perspectiveMatrix = null;
export const initializeBuffer = () => {
   const squareVerticesBuffer = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, squareVerticesBuffer);

  let vertices = [
    1.0,  1.0,  0.0,
    -1.0, 1.0,  0.0,
    1.0,  -1.0, 0.0,
    -1.0, -1.0, 0.0
  ];

  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);

  (() => {
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0)
    
    loadIdentity();
    mvTranslate([-0.0, 0.0, -6.0]);
    GL.bindBuffer(GL.ARRAY_BUFFER, squareVerticesBuffer);
    GL.vertexAttribPointer(globalVertexPositionAttribute, 3, GL.FLOAT, false, 0, 0);
    setMatrixUniforms();
    GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
  })()
}

function makePerspective(fovy, aspect, znear, zfar)
    {
        var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
        var ymin = -ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;
    
        return makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
    }

    function makeFrustum(left, right,
      bottom, top,
      znear, zfar)
{
var X = 2*znear/(right-left);
var Y = 2*znear/(top-bottom);
var A = (right+left)/(right-left);
var B = (top+bottom)/(top-bottom);
var C = -(zfar+znear)/(zfar-znear);
var D = -2*zfar*znear/(zfar-znear);

return $M([[X, 0, A, 0],
[0, Y, B, 0],
[0, 0, C, D],
[0, 0, -1, 0]]);
}
