import { NextResponse } from "next/server";
import { connectDB } from '../../../utils/mongoose';
import CampaniaMarketing from '../../../models/CampaniaMarketing';
import { URL } from 'url';

export async function GET(request){
    try{
        connectDB();
        const searchParams = new URL(request.url).searchParams;
        const idProyecto = await searchParams.get('p');
        if (idProyecto){
            const data = await CampaniaMarketing.find({ id_proyecto: idProyecto });
            return NextResponse.json({data});
        }else{
            return NextResponse.json(
                    { message: 'Parámetro de consulta "p" es requerido.' },
                    { status: 400 } // Bad Request
                );
        }
    }catch(error){
        return NextResponse.json({ message: "Error al buscar CampaniaMarketing por id_proyecto" }, { status: 500 });
    }
}
export async function POST(request){
    connectDB();
    const data = await request.json();
    if(data){
      const Jdata = data
        const newCampaniaMarketing = new CampaniaMarketing(Jdata)
        const savedCampaniaMarketing = await newCampaniaMarketing.save()    
        return NextResponse.json({"message": `holas CampaniaMarketing POST: ${savedCampaniaMarketing}`});
    }   else    {
        return NextResponse.json({ message: "Error al rescatar la data de CampaniaMarketing en el Request" }, { status: 500 });
    }   
}