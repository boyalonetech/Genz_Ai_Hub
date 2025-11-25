export interface PaymentData {
  email: string;
  amount: number; // amount in kobo (so 10000 = ₦100)
  reference: string;
  courseId: string;
  courseTitle: string;
  metadata?: {
    course_id: string;
    user_id?: string;
    course_title: string;
  };
}

export const paymentService = {
  // Initialize Paystack payment
  initializePayment(paymentData: PaymentData, callback: (response: any) => void) {
    // This will be handled by the Paystack button component
    return {
      ...paymentData,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      onSuccess: callback,
      onClose: () => console.log('Payment closed'),
    };
  },

  // Verify payment (you would call this from your backend)
  async verifyPayment(reference: string): Promise<boolean> {
    try {
      // In a real implementation, you would call your backend API
      // which then calls Paystack's verify transaction endpoint
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference }),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      const data = await response.json();
      return data.status === 'success';
    } catch (error) {
      console.error('Payment verification error:', error);
      return false;
    }
  },

  // Convert price string to amount in kobo
  parsePrice(price: string): number {
    if (price.toLowerCase() === 'free') {
      return 0;
    }
    
    // Remove currency symbols and commas, then convert to number
    const numericPrice = price.replace(/[^\d.]/g, '');
    const amountInNaira = parseFloat(numericPrice);
    
    // Convert to kobo (Paystack expects amount in kobo)
    return Math.round(amountInNaira * 100);
  },

  // Generate unique reference
  generateReference(): string {
    return `COURSE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};