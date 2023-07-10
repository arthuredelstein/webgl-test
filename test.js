/*
getActiveAttrib
getActiveUniform
getAttachedShaders
getAttribLocation
getBufferParameter
getFrameBufferAttachment
kUnmaskedRendererWebgl
kUnmaskedVendorWebgl
getProgramParameter
getProgramInfoLog
getRenderbufferParameter
getShaderParameter
getShaderInfoLog
getShaderSource
getTexParameter
getUniform
getUniformLocation
getVertexAttrib
*/

const getObjectParameterValues = (gl, object) => {
  const results = {};
  const parameterNames = Object.getOwnPropertyNames(Object.getPrototypeOf(object));
  const objectName = object.toString().replace("[object ", "").replace("]","");
  for (const parameterName of parameterNames) {
    const parameterIndex = object[parameterName];
    if (!isNaN(parameterIndex)) {
      const parameterValue = gl.getParameter(parameterIndex);
      if (parameterValue !== null) {
        results[parameterName] = parameterValue;
      }
    }
  }
  return results;
}

const getExtensionParameterValues = (gl) => {
  const results = {};
  const supportedExtensions = gl.getSupportedExtensions();
  for (const supportedExtension of supportedExtensions) {
    const extensionObject = gl.getExtension(supportedExtension);
    const extensionName = extensionObject.toString().replace("[object ", "").replace("]","");
    const extensionParameterValues = getObjectParameterValues(gl, extensionObject);
    results[extensionName] = extensionParameterValues;
  };
  return results;
};

const getWebglFingerprint = (gl) => ({
  contextAttributes: gl.getContextAttributes(),
  drawingBufferColorSpace: gl.drawingBufferColorSpace,
  unpackColorSpace: gl.unpackColorSpace,
  contextParameters: getObjectParameterValues(gl, gl),
  extensionParameters: getExtensionParameterValues(gl),
});

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const gl = canvas.getContext("webgl2");
console.log(getWebglFingerprint(gl));
