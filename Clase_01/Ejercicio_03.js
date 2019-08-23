function Mostrar(numero, cadena) {
    if (cadena != null) {
        for (var i = 0; i < numero; i++) {
            console.log(cadena);
        }
    }
    else {
        console.log(numero / -1);
    }
}
Mostrar(5, "Q onda");
