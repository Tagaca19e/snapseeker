import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';

export default function Pagination({ pagination, onChangePagination }) {
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      {pagination?.previous && (
        <div className="-mt-px flex w-0 flex-1">
          <a
            href={pagination.previous}
            onClick={onChangePagination}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </a>
        </div>
      )}

      {/* Pagination tabs */}
      <div className="hidden md:-mt-px md:flex">
        {pagination &&
          Object.keys(pagination?.other_pages).map((page) => (
            <a
              key={page}
              href={pagination.other_pages[page]}
              onClick={onChangePagination}
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {page}
            </a>
          ))}
      </div>

      {pagination?.next && (
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <a
            href={pagination?.next}
            onClick={onChangePagination}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </a>
        </div>
      )}
    </nav>
  );
}
