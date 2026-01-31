import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SkillsetInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
}

const SkillsetInput: React.FC<SkillsetInputProps> = ({
  skills,
  onChange,
  placeholder = 'Type a skill and press Enter',
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const skill = inputValue.trim();
      if (skill && !skills.includes(skill)) {
        onChange([...skills, skill]);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && skills.length > 0) {
      onChange(skills.slice(0, -1));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border border-input rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="flex items-center gap-1 px-2.5 py-1 text-sm font-normal bg-accent text-accent-foreground"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 hover:text-destructive transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={skills.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Press Enter to add a skill
      </p>
    </div>
  );
};

export default SkillsetInput;
