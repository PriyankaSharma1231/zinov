import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  await resend.emails.send({
    from: "onboarding@resend.dev",    
    to: "inboxpriyanka1231@gmail.com",      
    subject: `New ZINOV Order — ₹${data.total} from ${data.customerName}`,
    html: `
      <h2>New Order Received!</h2>
      <p><b>Customer:</b> ${data.customerName}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Address:</b> ${data.address}</p>
      <hr/>
      <p><b>Total Paid:</b> ₹${data.total}</p>
      <p><b>Razorpay Payment ID:</b> ${data.paymentId}</p>
    `,
  });

  return Response.json({ ok: true });
}