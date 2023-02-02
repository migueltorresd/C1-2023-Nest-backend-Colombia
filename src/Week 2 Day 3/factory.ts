abstract class orden {
  public abstract MetodoFabricacion(): carro;
  public autoNuevo(): string {
    const carro = this.MetodoFabricacion();
    return `usted uso la orden para su auto nuevo ${carro.operation()}`;
  }
}
class TipoCarro1 extends orden {
  public MetodoFabricacion(): carro {
    return new carro1();
  }
}

class TipoCarro2 extends orden {
  public MetodoFabricacion(): carro {
    return new carro2();
  }
}
interface carro {
  operation(): string;
}

class carro1 implements carro {
  public operation(): string {
    console.log('-----------------------amarillo-----------------------------');
    return '{taxi es tipocarro1}';
  }
}

class carro2 implements carro {
  public operation(): string {
    console.log('-----------------------rojos-----------------------------');
    return '{familiar es tipocarro2}';
  }
}

function cliente(orden: orden) {
  // ...
  console.log('Cliente: no conozco la clase orden, pero aún funciona');
  console.log(orden.autoNuevo());
  // ...
}
console.log('compro: TipoCarro1.');
cliente(new TipoCarro1());

// console.log('compro: TipoCarro2.');
// cliente(new TipoCarro2());
