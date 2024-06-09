import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const userValidationSchema = yup.object().shape({
  name: yup.string().required("Event name is required."),
  job: yup.string().optional(),
  role: yup.string().optional(),
  mobile: yup.string().required("Mobile number is required."),
});

export function CreateUserForm({ open, onClose, initialValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div
      className={`w-full h-full bg-gray-600/45 absolute  flex-row items-center justify-center left-0 top-0 z-50 transition-transform ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl relative w-1/2 p-4">
        <button className=" absolute right-2 top-2" onClick={onClose}>
          close
        </button>
        <form
          className="flex flex-col p-4 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              className="border border-gray-400 rounded-md p-1 h-10"
              {...register("name")}
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Job</label>
            <input
              className="border border-gray-400 rounded-md p-1 h-10"
              {...register("job")}
            />
            <p className="text-red-500">{errors.job?.message}</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="role">Role</label>
            <input
              className="border border-gray-400 rounded-md p-1 h-10"
              {...register("role")}
            />
            <p className="text-red-500">{errors.role?.message}</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              className="border border-gray-400 rounded-md p-1 h-10"
              {...register("mobile")}
            />
            <p className="text-red-500">{errors.mobile?.message}</p>
          </div>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            {initialValues ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
