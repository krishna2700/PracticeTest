import React, { useState, useEffect } from "react";
import { getAdminDetails, updatePrice } from "../../services/api";
import InputField from "../common/InputField";
import Button from "../common/Button";
import BarGraph from "./BarGraph";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [customAmount, setCustomAmount] = useState(0);
  const [regularAmounts, setRegularAmounts] = useState({
    category_7: 0,
    category_8: 0,
    category_9: 0,
    category_10: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminDetails();
        setData(response.data);
        setCustomAmount(response.data.amount.category_6 || 0);
        setRegularAmounts({
          category_7: response.data.amount.category_7 || 0,
          category_8: response.data.amount.category_8 || 0,
          category_9: response.data.amount.category_9 || 0,
          category_10: response.data.amount.category_10 || 0,
        });
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await updatePrice(data.id, {
        category_6: customAmount,
        ...regularAmounts,
      });
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>{data.name}</h1>
      <h2>{data.location}</h2>
      <div className="song-request-amounts">
        {data.charge_customers ? (
          <>
            <InputField
              label="Custom song request amount"
              value={customAmount}
              onChange={(e) =>
                setCustomAmount(Math.max(99, parseInt(e.target.value, 10)) || 0)
              }
            />
            <InputField
              label="Regular song request amount (Category 7)"
              value={regularAmounts.category_7}
              onChange={(e) =>
                setRegularAmounts({
                  ...regularAmounts,
                  category_7: Math.max(79, parseInt(e.target.value, 10)) || 0,
                })
              }
            />
            <InputField
              label="Regular song request amount (Category 8)"
              value={regularAmounts.category_8}
              onChange={(e) =>
                setRegularAmounts({
                  ...regularAmounts,
                  category_8: Math.max(59, parseInt(e.target.value, 10)) || 0,
                })
              }
            />
            <InputField
              label="Regular song request amount (Category 9)"
              value={regularAmounts.category_9}
              onChange={(e) =>
                setRegularAmounts({
                  ...regularAmounts,
                  category_9: Math.max(39, parseInt(e.target.value, 10)) || 0,
                })
              }
            />
            <InputField
              label="Regular song request amount (Category 10)"
              value={regularAmounts.category_10}
              onChange={(e) =>
                setRegularAmounts({
                  ...regularAmounts,
                  category_10: Math.max(19, parseInt(e.target.value, 10)) || 0,
                })
              }
            />
            <Button label="Save" onClick={handleSave} />
            <BarGraph
              customAmount={customAmount}
              regularAmounts={regularAmounts}
            />
          </>
        ) : (
          <p>Save button and fields are greyed out</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
