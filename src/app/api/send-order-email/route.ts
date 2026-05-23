import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  // Build items table rows
  const itemRows = (data.items || [])
    .map(
      (item: any) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${item.name}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.size}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.qty}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₹${Math.round(item.price * item.qty).toLocaleString("en-IN")}</td>
        </tr>
      `
    )
    .join("");

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "inboxpriyanka1231@gmail.com",  
    subject: `🛍️ New ZINOV Order — ₹${data.total} from ${data.customerName}`,
    html: `
      <h2 style="color:#1a1a1a">New Order Received!</h2>

      <h3 style="color:#b8943f">Customer Details</h3>
      <p><b>Name:</b> ${data.customerName}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Address:</b> ${data.address}</p>

      <h3 style="color:#b8943f">Items Ordered</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <thead>
          <tr style="background:#f5f0e8">
            <th style="padding:8px;text-align:left">Product</th>
            <th style="padding:8px;text-align:center">Size</th>
            <th style="padding:8px;text-align:center">Qty</th>
            <th style="padding:8px;text-align:right">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>

      <hr style="margin:16px 0"/>
      <p><b>Total Paid:</b> ₹${data.total}</p>
      <p><b>Payment ID:</b> ${data.paymentId}</p>
    `,
  });

  return Response.json({ ok: true });
}