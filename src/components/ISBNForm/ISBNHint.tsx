import isbn from '../../assets/images/isbn-example.png';
export const HintISBN = () => {
  return (
    <div className="flex flex-row items-center">
      <img src={isbn} alt="ISBN Example" className="w-30 object-contain mr-5" />
      <p className="font-geist text-xs md:text-sm">
        ISBN is a unique identification number assigned to each book. It can be
        found under the barcode or on the first pages of the book.
      </p>
    </div>
  );
};
