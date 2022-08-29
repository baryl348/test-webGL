export let globalVertexPositionAttribute = null;
export let globalShaderProgram = null;

export const initializeShaders = (GL) => {
    const arrayIDShaders = ['shader-fs', 'shader-vs']
    let fragmentShader = null;
    let vertexShader = null;
    
   ((GL) => {
    const shadersIds = findIdsShader(arrayIDShaders);
    if (checkIsNullShared(shadersIds)) {
        return;
    }
    fragmentShader = createShader(GL, shadersIds[0]);
    vertexShader = createShader(GL, shadersIds[1])
   })(GL)

   // создать шейдерную программу

  let shaderProgram = GL.createProgram();
  GL.attachShader(shaderProgram, vertexShader);
  GL.attachShader(shaderProgram, fragmentShader);
  GL.linkProgram(shaderProgram);

  // Если создать шейдерную программу не удалось, вывести предупреждение

  if (!GL.getProgramParameter(shaderProgram, GL.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }

  GL.useProgram(shaderProgram);

  let vertexPositionAttribute = GL.getAttribLocation(shaderProgram, "aVertexPosition");
  globalVertexPositionAttribute = vertexPositionAttribute;
  GL.enableVertexAttribArray(vertexPositionAttribute);
  globalShaderProgram = shaderProgram;
}

const findIdsShader = (array) => {
    let i = 0, length = array.length;
    let result = [];
    while (i < length) {
        const shaderId = document.querySelector(`#${array[i]}`);
        if (!shaderId) {
            result.push(null)
        } else {
            result.push(shaderId);
        }
        i++
    }
    return result;
}

const checkIsNullShared = (array) => {
   return array.includes(null)
}

const createShader = (gl,shaderScript) => {
    let theSource, currentChild, shader;
    theSource = '';
    currentChild = shaderScript.firstChild;
    while(currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
          theSource += currentChild.textContent;
        }
    
        currentChild = currentChild.nextSibling;
      }
      if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
      } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
      } else {
         // неизвестный тип шейдера
         return null;
      }
      gl.shaderSource(shader, theSource);

      // скомпилировать шейдерную программу
    gl.compileShader(shader);

  // Проверить успешное завершение компиляции
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
      return null;
  }

  return shader;
}
