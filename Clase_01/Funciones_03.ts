function Mostrar(numero : number, cadena? : string) : void
{
  if(cadena != null)
  {
    for(var i = 0; i< numero; i++)
    {
      console.log(cadena);
    }
  }
  else
  {
    console.log(numero / -1);
  }
}
