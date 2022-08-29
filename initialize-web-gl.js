
let GL = null;

export const initializeWebGl = async (element) => {
    const webGl = await initWebGl(element);
    if (webGl) {
        webGl.clearColor(0.0, 0.0, 0.0, 1.0);                      // установить в качестве цвета очистки буфера цвета чёрный, полная непрозрачность
        webGl.enable(webGl.DEPTH_TEST);                               // включает использование буфера глубины
        webGl.depthFunc(webGl.LEQUAL);                                // определяет работу буфера глубины: более ближние объекты перекрывают дальние
        webGl.clear(webGl.COLOR_BUFFER_BIT | webGl.DEPTH_BUFFER_BIT);      // очистить буфер цвета и буфер глубины.
      }
      return webGl;
}

const initWebGl = async (element) => {

  try {
    // Попытаться получить стандартный контекст. Если не получится, попробовать получить экспериментальный.
    GL = element.getContext("webgl") || element.getContext("experimental-webgl");
  }
  catch(e) {}

  // Если мы не получили контекст GL, завершить работу
  if (!GL) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
    GL = null;
  }
  return GL;
}