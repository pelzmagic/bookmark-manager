export default function ConfirmArchiveModal({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  return (
    <div className="flex min-w-112.5 flex-col gap-6 rounded-xl bg-white p-6">
      <h1 className="text-light-900 font-manrope text-2xl leading-[140%] font-bold">
        Archive bookmark
      </h1>
      <p className="text-light-800 font-manrope text-sm leading-[150%] font-medium">
        Are you sure you want to archive this bookmark?
      </p>
      <div className="flex items-center justify-end gap-4">
        <button
          className="border-light-400 text-light-900 font-manrope rounded-lg border px-4 py-3 text-base leading-[140%] font-semibold"
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button className="font-manrope rounded-lg bg-teal-700 px-4 py-3 text-base leading-[140%] font-semibold text-white">
          Archive
        </button>
      </div>
    </div>
  );
}
