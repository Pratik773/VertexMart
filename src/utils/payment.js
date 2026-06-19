export const loadRazorpay = (amount, name, description) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key: "YOUR_RAZORPAY_TEST_KEY", // Replace with your actual Test Key ID from Dashboard
        amount: amount * 100, // Amount in paise (e.g., 500.00 -> 50000)
        currency: "INR",
        name: "VertexMart",
        description: description,
        handler: function (response) {
          alert(
            "Payment Successful! Payment ID: " + response.razorpay_payment_id,
          );
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        theme: { color: "#2563eb" }, // Matches your blue theme
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };
    // script.onerror = () => {
    //   alert("Failed to load Razorpay SDK. Check your internet connection.");
    // };
    document.body.appendChild(script);
  });
};
