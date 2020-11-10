import React, { useEffect, useState } from "react";
import firebase from "../firebase";

export interface ContactUsFormProps {
  label?: string;
  value?: any;
  handleSubmit?: () => void;
}

const ContactUsForm: React.FC<ContactUsFormProps> = () => {
  const [valueInput, setValueInput] = useState<any>("");
  const [valueInputUpdate, setValueInputUpdate] = useState<any>("");
  const [listRefDoc, setListRefDoc] = useState<any>([]);

  const db = firebase.firestore();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (valueInput) {
      db.collection("list")
        .add({
          createDate: new Date(),
          value: valueInput,
        })
        .then((res) => {
          fetchData();
          setValueInput("");
        });
    }
  };

  const fetchData = async () => {
    const listRef = db.collection("list");

    // return database.getEmployeeList().then((employeeList) => {
    //   setEmployeeList(
    //     Object.keys(employeeList ?? {}).map((key) => {
    //       return {
    //         ...employeeList[key],
    //         id: key,
    //       };
    //     })
    //   );
    // });

    return listRef.get().then((res: any) => {
      console.log("res =>", res);
      setListRefDoc(
        Object.keys(res ?? {}).map((key) => {
          return {
            ...res[key],
            // data: res.data().value,
          };
        })
      );

      // res.docs.map((doc: any) => {
      //   setListRefDoc([
      //     {
      //       id: doc.id,
      //       data: doc.data().value,
      //     },
      //   ]);
      // });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handelDelete = (id: string) => {
    db.collection("list")
      .doc(id)
      .delete()
      .then(() => {
        alert("Delete Success");
      })
      .then(() => {
        fetchData();
      });
  };

  const handleUpdate = (id: string, data: string) => {
    console.log("id", id);
    db.collection("list")
      .doc(id)
      .set({
        updataDate: new Date(),
        value: valueInputUpdate,
      })
      .then(() => {
        alert("Update Success");
        fetchData();
      });
  };

  console.log("listRefDoc", listRefDoc);

  return (
    <form onSubmit={handleSubmit} noValidate={true}>
      <div
        className="container"
        style={{
          position: "absolute",
          top: "25%",
          right: "50%",
          transform: "translate(50%, -25%)",
          textAlign: "center",
        }}
      >
        <div className="form-group">
          <div>Input : </div>
          <input
            type="text"
            value={valueInput}
            onChange={(event) => {
              setValueInput(event.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        {listRefDoc.length > 0 ? (
          listRefDoc.map((doc: any) => (
            <ul>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    value={valueInputUpdate || doc.data}
                    onChange={(event) => {
                      setValueInputUpdate(event.target.value);
                    }}
                  />
                  <button onClick={() => handleUpdate(doc.id, doc.data)}>
                    update
                  </button>
                  <button onClick={() => handelDelete(doc.id)}>delete</button>
                </div>
              </li>
            </ul>
          ))
        ) : (
          <div>
            <h3>add list</h3>
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactUsForm;
