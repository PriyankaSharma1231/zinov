import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  const itemRows = (data.items || [])
    .map(
      (item: any) => `
        <tr>
          <td style="padding:10px 8px;border-bottom:1px solid #f0ebe0">${item.name}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #f0ebe0;text-align:center">${item.size}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #f0ebe0;text-align:center">${item.qty}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #f0ebe0;text-align:right">
            ₹${Math.round(item.price * item.qty).toLocaleString("en-IN")}
          </td>
        </tr>
      `
    )
    .join("");

  const isCOD = data.paymentMethod === "Cash on Delivery";

  // ── 1. EMAIL TO ADMIN ──
  const adminResult = await resend.emails.send({
    // ⚠️  Replace with your verified Resend domain sender, e.g. orders@yourdomain.com
    from: "ZINOV Orders <orders@shopzinov.com>",
    to: "inboxpriyanka1231@gmail.com",
    subject: `🛍️ New ZINOV Order — ₹${data.total} from ${data.customerName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#b8943f;">New Order Received!</h2>
        <p><b>Name:</b> ${data.customerName}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Address:</b> ${data.address}</p>
        <p><b>Payment Method:</b> ${data.paymentMethod || "Online Payment"}</p>
        ${data.orderRef ? `<p><b>Order Ref:</b> ${data.orderRef}</p>` : ""}
        <table style="width:100%;border-collapse:collapse;margin-top:12px">
          <thead>
            <tr style="background:#f9f5ee">
              <th align="left" style="padding:8px">Product</th>
              <th align="center" style="padding:8px">Size</th>
              <th align="center" style="padding:8px">Qty</th>
              <th align="right" style="padding:8px">Price</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
        <hr style="border:none;border-top:1px solid #f0ebe0;margin:16px 0" />
        <p><b>Total:</b> ₹${data.total}</p>
        <p><b>Payment ID:</b> ${data.paymentId}</p>
      </div>
    `,
  });

  console.log("Admin email result:", JSON.stringify(adminResult));

  // ── 2. EMAIL TO CUSTOMER ──
  const customerResult = await resend.emails.send({
    // ⚠️  Replace with your verified Resend domain sender, e.g. orders@yourdomain.com
    from: "ZINOV <orders@shopzinov.com>",
    to: data.email,          // ← customer's email from the form
    subject: "✨ Your ZINOV Order Has Been Received",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#2c2c2c;">
        <div style="background:#b8943f;padding:24px 32px;border-radius:4px 4px 0 0;">
          <h1 style="margin:0;color:#fff;font-size:24px;letter-spacing:2px;">ZINOV</h1>
        </div>

        <div style="padding:32px;border:1px solid #f0ebe0;border-top:none;border-radius:0 0 4px 4px;">
          <h2 style="color:#b8943f;margin-top:0;">
            Thank You For Your Order, ${data.customerName}! 🎉
          </h2>

          <p style="color:#555;line-height:1.6;">
            We've successfully received your order and our team will begin
            processing it shortly.
          </p>

          ${
            isCOD
              ? `<div style="background:#fffbeb;border:1px solid #fbbf24;border-radius:4px;padding:12px 16px;margin:16px 0;">
                  <p style="margin:0;color:#92400e;font-size:14px;">
                    💡 <b>Cash on Delivery</b> — Please keep <b>₹${Number(data.total).toLocaleString("en-IN")}</b> ready at the time of delivery.
                  </p>
                </div>`
              : `<div style="background:#f0fdf4;border:1px solid #86efac;border-radius:4px;padding:12px 16px;margin:16px 0;">
                  <p style="margin:0;color:#166534;font-size:14px;">
                    ✅ <b>Payment Confirmed</b> — Payment ID: ${data.paymentId}
                  </p>
                </div>`
          }

          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr style="background:#f9f5ee;">
              <td style="padding:8px 12px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#888"><b>Delivering to</b></td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-size:14px;color:#444">${data.address}</td>
            </tr>
          </table>

          <h3 style="color:#b8943f;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
            Order Summary
          </h3>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <thead>
              <tr style="background:#f9f5ee;">
                <th align="left" style="padding:10px 8px;color:#888;font-weight:600">Product</th>
                <th align="center" style="padding:10px 8px;color:#888;font-weight:600">Size</th>
                <th align="center" style="padding:10px 8px;color:#888;font-weight:600">Qty</th>
                <th align="right" style="padding:10px 8px;color:#888;font-weight:600">Price</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <table style="width:100%;margin-top:12px;font-size:14px;">
            <tr>
              <td style="padding:6px 8px;color:#666">Subtotal</td>
              <td align="right" style="padding:6px 8px;color:#666">₹${Number(data.subtotal ?? data.total).toLocaleString("en-IN")}</td>
            </tr>
            <tr>
              <td style="padding:6px 8px;color:#666">Shipping</td>
              <td align="right" style="padding:6px 8px;color:#b8943f;font-weight:600">Free</td>
            </tr>
            <tr style="border-top:1px solid #f0ebe0;">
              <td style="padding:10px 8px;font-weight:700;font-size:16px;">Total</td>
              <td align="right" style="padding:10px 8px;font-weight:700;font-size:16px;color:#b8943f;">₹${Number(data.total).toLocaleString("en-IN")}</td>
            </tr>
          </table>

          <div style="margin-top:24px;padding:16px;background:#f9f5ee;border-radius:4px;font-size:13px;color:#666;line-height:1.8;">
            <p style="margin:0;">📦 Delivery within Gujarat: <b>2 working days</b></p>
            <p style="margin:0;">🚚 Other states: <b>5-7 working days</b></p>
            <p style="margin:4px 0 0;">📞 For any queries, call us at <b>+91 9737018077</b></p>
          </div>

          <p style="margin-top:28px;color:#888;font-size:13px;">
            Warm Regards,<br />
            <b style="color:#2c2c2c;">Team ZINOV</b>
          </p>
        </div>
      </div>
    `,
  });

  console.log("Customer email result:", JSON.stringify(customerResult));

  // Surface errors for debugging
  if (customerResult.error) {
    console.error("Customer email FAILED:", customerResult.error);
  }

  return Response.json({
    ok: true,
    adminEmail: adminResult,
    customerEmail: customerResult,
  });
}