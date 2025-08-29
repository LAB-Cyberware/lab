export async function POST(request){
    connectDB();
    const data = await request.json();
    if(data){
      console.log("=============   POST.api.EstudioMercado DATA:    ==================")
      console.log(data)

      //const Jdata = JSON.parse(data)
    /*  const Jdata = data
        const newEstudioMercado = new EstudioMercado(Jdata)
        const savedEstudioMercado = await newEstudioMercado.save()    
        return NextResponse.json({"message": `holas EstudioMercado POST: ${savedEstudioMercado}`});
    }   else    {
        console.log("=============   DATA NULL !!   ==================")
        console.log(data)
        return NextResponse.json({ message: "Error al rescatar la data de EstudioMercado en el Request" }, { status: 500 });
    }
    */   
    }
}