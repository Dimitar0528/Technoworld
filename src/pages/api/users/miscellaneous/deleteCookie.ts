
export const GET = async () => {
    let cookie = `_jwt=; Max-Age=0; Path=/`;
 return new Response(JSON.stringify({message: 'You have sucessfully logged out of your account!'}), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })
}