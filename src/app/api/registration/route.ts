export async function POST(request: Request) {
    const formData = await request.formData()
    const name = formData.get('id')
    const email = formData.get('email')
    return Response.json({ name, email })
}