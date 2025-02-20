import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

interface Payment {
  id: number;
  full_name: string;
  phone_number: string;
  transaction_id: string;
  status: string;
  membership_tier: string;
}

const PaymentVerification = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data, error } = await supabase
          .from("payments")
          .select("*")
          .order("id", { ascending: false }); // Fetch data in descending order

        if (error) {
          throw error;
        }

        setPayments(data);
      } catch (error) {
        setError("Error fetching payments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();

    const paymentSubscription = supabase
      .channel('public:payments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'payments' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setPayments((prevPayments) => [payload.new, ...prevPayments]);
        } else if (payload.eventType === 'UPDATE') {
          setPayments((prevPayments) =>
            prevPayments.map((payment) =>
              payment.id === payload.new.id ? payload.new : payment
            )
          );
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(paymentSubscription);
    };
  }, []);

  const handleVerifyPayment = async (paymentId: number) => {
    try {
      const { error } = await supabase
        .from("payments")
        .update({ status: "approved" })
        .eq("id", paymentId);

      if (error) {
        throw error;
      }

      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === paymentId ? { ...payment, status: "approved" } : payment
        )
      );
    } catch (error) {
      setError("Error verifying payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Payment Verification
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Verify payments sent by members
        </p>

        {loading ? (
          <p className="text-center mt-4">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 mt-4">{error}</p>
        ) : (
          <div className="mt-4">
            <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.phone_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.transaction_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.status === "approved" ? "Approved" : "Pending Approval"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {payment.status === "pending" && (
                          <button
                            onClick={() => handleVerifyPayment(payment.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerification;