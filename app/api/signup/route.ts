import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/sequelize/models';

export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const { email, password, name } = req;
        await db.models.User.setUser({email, password, name});
        return NextResponse.json({
            success: true
        });
    }
    catch(error:any) {
        console.log('sign error =>', error);
        return NextResponse.json({
            success: false,
            message: error.toString()            
        });
    }
}