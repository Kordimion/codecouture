import { Api } from "../Api";
import { useQuery } from "@tanstack/react-query";

let productClient = new Api({ baseUrl: "https://localhost:7188" });

function App() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: () => productClient.api.productsList().then((res) => res.data),
  });

  return (
    <div className="w-100 flex h-screen flex-col items-center justify-start gap-8 bg-gray-50">
      <h1 className="mt-16 mb-8 text-center text-8xl font-bold text-indigo-800">
        Eshop Admin
      </h1>
      <div className="flex w-full items-start justify-start gap-8 px-8">
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
