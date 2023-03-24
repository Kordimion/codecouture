import { useState, useEffect } from "react";
import { Product, Api } from "./api/Api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

let productClient = new Api({ baseUrl: "https://localhost:7188" });

function App() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["products"],
    queryFn: () => productClient.api.productsList().then((res) => res.data),
  });

  console.log(query.status);

  const add = useMutation({
    mutationFn: (p: Product) => productClient.api.productsCreate(p),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");

  const addProduct = async () => {
    add.mutate({ name: newProductName, description: newProductDescription });
    setNewProductName("");
    setNewProductDescription("");
  };

  return (
    <div className="w-100 flex h-screen flex-col items-center justify-start gap-8 bg-gray-50">
      <h1 className="mt-16 mb-8 text-center text-8xl font-bold text-indigo-800">
        Eshop Admin
      </h1>

      <div className="flex w-full items-start justify-start gap-8 px-8">
        <div className="flex flex-col items-center justify-center gap-8 rounded-2xl bg-gray-200 p-8 text-center text-indigo-800">
          <h2 className="text-2xl font-bold">New Product</h2>
          <div className="flex flex-col justify-center gap-4">
            <label htmlFor="newproduct-name" className="text-left text-xl ">
              Name
              <input
                type="text"
                id="newproduct-name"
                className="mt-2 w-96 rounded-md bg-gray-100 py-2 px-4"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
            </label>

            <label
              htmlFor="newproduct-description"
              className="text-left text-xl "
            >
              Description
              <input
                type="text"
                id="newproduct-description"
                className="mt-2 w-96 rounded-md bg-gray-100 py-2 px-4"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
              />
            </label>

            <button
              className="mt-4 w-96 rounded-md bg-indigo-600 p-4 text-4xl font-bold text-gray-100 hover:bg-indigo-700 hover:text-white"
              onClick={addProduct}
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-8 rounded-md bg-gray-200 p-8 text-center text-indigo-800">
          <h2 className="whitespace-nowrap text-2xl font-bold">All Products</h2>
          <ul className="flex flex-wrap gap-8">
            {query.data?.map((p) => (
              <div className="w-48 bg-gray-100 p-4 text-left hover:bg-gray-50">
                <p className="text-xl font-bold">{p.name}</p>
                <p className="text-xl">{p.description}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
