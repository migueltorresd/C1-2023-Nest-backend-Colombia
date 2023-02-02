class controlcarro {
  private static instance: controlcarro;
  private constructor() {}

  public static getInstance(): controlcarro {
    if (!controlcarro.instance) {
      controlcarro.instance = new controlcarro(); //definimos la instancia
    }

    return controlcarro.instance;
  }

  public logica() {
    // ...
  }
}
function cliente() {
  const orden1 = controlcarro.getInstance();
  const orden2 = controlcarro.getInstance();

  if (orden1 === orden2) {
    console.log('en perfecto estado para su operacion');
  } else {
    console.log(
      'no cumple con los requerimientos minimos debe revisarse la orden',
    );
  }
}
cliente();
