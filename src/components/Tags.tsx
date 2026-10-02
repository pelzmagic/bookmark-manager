type TagProps = {
  tag: string;
};

export default function Tags({ tag }: TagProps) {
  return (
    <div className="bg-surface-muted rounded-sm px-2 py-0.5">
      <p className="text-ink-muted font-manrope text-xs leading-[140%] font-medium">
        {tag}
      </p>
    </div>
  );
}
