import MadagascarMapPro from "@/components/utils/MadagascarMap";
import MadagascarMap from "@/components/utils/svgs/MadagascarMap";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* <FormTextArea
      label={"Biographie"}
      name="bio"
      icon={FileText}
      value={data.bio || ""}
      setData={setData}
      error={errors.bio}
      clearError={clearErrors}
      edit={edit}
      className="min-h-25"
      placeholder={"Présentez-vous..."}
    /> */}

      {/* <FormSelect
        label={"Catégorie *"}
        name="category"
        value={data.category}
        options={TICKET_CATEGORIES}
        setData={setData}
        error={errors.category}
        clearError={clearErrors}
      /> */}

      {/* <FormRadioGroup
        label={"Méthode de versement"}
        name="payoutMethod"
        options={PAYOUT_METHODS}
        value={data.payoutMethod || ""}
        setData={setData}
        error={errors.payoutMethod}
        clearError={clearErrors}
        edit={edit}
        className="grid-cols-3"
      /> */}

      {/* <MadagascarMap /> */}
      <MadagascarMapPro />
    </>
  );
}
