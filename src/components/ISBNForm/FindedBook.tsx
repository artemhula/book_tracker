import noImage from '../../assets/images/no-cover.png';

type FindedBookProps = {
  title: string;
  author: string;
  coverURL: string;
};

export const FindedBook = ({ title, author, coverURL }: FindedBookProps) => {
  return (
    <>
      <img
        src={coverURL ?? noImage}
        alt={title}
        className="w-12 h-16 mr-3 object-contain"
      />
      <div className="flex justify-center flex-col">
        <p className="font-geist text-gray-900 font-semibold text-lg  ">
          {title}
        </p>
        <p className="font-geist text-gray-500 font-md ">{author}</p>
      </div>
    </>
  );
};
