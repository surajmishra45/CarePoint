import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Function to calculate age from date of birth
  const calculatedAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  // Function to format slotDate from "DD_MM_YYYY" to "YYYY-MM-DD"
  const formatSlotDate = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${year}-${month}-${day}`;
  };

  const value = {
    calculatedAge,
    formatSlotDate,  // Provide slotDate formatting function
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
