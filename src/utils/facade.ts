
type InputData = string | null | object | any[]|undefined;

export default function facade(data: InputData): any | null {
  if (data === null) {
    return null;
  }

  if (typeof data === 'string') {
    if (data === "[]") {
      return null;
    }
    try {
      // Intentar convertir el string a objeto JSON
      const parsedData = JSON.parse(data);
      // Si se parseó correctamente y es un objeto (o array, que es un tipo de objeto en JS)
      if (typeof parsedData === 'object' && parsedData !== null) {
        return parsedData;
      }
      // Si se parseó pero no resultó ser un objeto (ej: "true", "123")
      return null;
    } catch (e) {
      // Si la conversión falla, el string no se puede convertir a objeto JSON
      return null;
    }
  }

  if (Array.isArray(data)) {
    // Si es un array y tiene al menos un elemento
    if (data.length > 0) {
      return data[0];
    }
    // Si es un array vacío
    return null;
  }

  if (typeof data === 'object') {
    // Si es un objeto (y ya hemos excluido null)
    return data;
  }

  // Si no se cumple ninguna de las condiciones anteriores
  return null;
}
  