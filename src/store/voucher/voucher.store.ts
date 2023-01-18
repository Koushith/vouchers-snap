import create from "zustand";

const useVoucherStore = create((set) => ({
  createStep: 1,
  fetching: false,
  roleName: "",

  setRoleName: (name: string) => {
    set((state: any) => ({
      ...state,
      roleName: name,
    }));
  },

  setFetching: (status: boolean) => {
    set((state: any) => ({
      ...state,
      fetching: status,
    }));
  },
  setCreateStep: (step: any) =>
    set((state: any) => ({
      createStep: step,
    })),
  formData: {},
  setFormData: (data: object) =>
    set((state: any) => ({
      formData: data,
    })),

  accountDetails: {},

  setAccountDetails: (data: object) =>
    set((state: any) => ({
      accountDetails: data,
    })),

  voucherDetails: {},

  setVoucherDetails: (data: object) =>
    set((state: any) => ({
      voucherDetails: data,
    })),

  sharableDigest: "",
  setSharableDigest: (digest: any) =>
    set((state: any) => ({
      sharableDigest: digest,
    })),
}));
export default useVoucherStore;
