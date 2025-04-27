export default function VerifyInput({
  id,
  input,
  onChange,
  inputRef,
  onKeyDown
}: {
  id: string;
  input: string;
  onChange: (val: string) => void;
  inputRef?: (el: HTMLInputElement) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
      <input
          id={id}
          type="text"
          maxLength={1}
          value={input}
          onChange={(e) => onChange(e.target.value)}
          ref={inputRef}
          onKeyDown={onKeyDown}
          className="w-12 h-12 text-center border rounded text-primary-dark bg-ct-white"
      />
  );
}
