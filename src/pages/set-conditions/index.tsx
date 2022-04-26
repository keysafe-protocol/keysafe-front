import Button from "components/button";
import Input from "components/input";
import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import SetCondition from "./set-condition";

const SetConditions = observer(() => {
  const {
    conditionStore: { conditions },
  } = useStores();
  const navigate = useNavigate();

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold" style={{ color: "#2563eb" }}>
        Set Owner’s Auth Conditions
      </h2>
      <main className="mt-4">
        {Array.from({ length: 3 }).map((_, index) => {
          const condition = conditions[index];
          return (
            <div key={index} className="mb-4">
              <div className="font-medium">
                Condition #{index + 1}{" "}
                {condition?.type && <span>- {condition?.type}</span>}
              </div>
              <div className="flex items-center">
                <Input value={condition?.value} disabled className="w-80" />
                <span className="ml-2">
                  <SetCondition />
                </span>
              </div>
            </div>
          );
        })}
      </main>
      <footer className="flex mt-20">
        <Button type="primary">CONTINUE</Button>
        <Button onClick={() => navigate(-1)} className="ml-4">
          GO BACK
        </Button>
      </footer>
    </section>
  );
});
export default SetConditions;
