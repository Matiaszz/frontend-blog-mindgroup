import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import type React from "react";
import { FormInput } from "../components/FormInput";
import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { Button } from "../components/Button";
import { updateUser } from "../services/userService";

const defaultValues = {
    profilePictureUrl: '',
    name: '',
    email: '',
    biography: '',
}

export function Settings() {
  const [updateForm, setUpdateForm] = useState(defaultValues);
  const { classes } = useTheme();
  const { user, loading } = useUser();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!user) return;
    setUpdateForm({
      profilePictureUrl: user.profilePictureUrl,
      name: user.name,
      biography: user.biography ?? '',
      email: user.email,
    });
  }, [user, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = await updateUser(updateForm);
    console.warn(user);
    if (user.errors) {
      alert(user.errors);
      return;
    };
    
    alert('Alterações salvas');
  }

  function isValidUrl(url: string){
    try {
      new URL(url);
      return true;
    } catch {
      return false
    }
  }

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(updateForm.email);
    const urlValid = isValidUrl(updateForm.profilePictureUrl);

    setDisabled(!(emailValid && urlValid)); 
  }, [updateForm.email, updateForm.profilePictureUrl]);
  

  return (
    <div className={`flex flex-col min-w-screen max-w-screen ${classes.textClass} p-20 gap-10`}>
      {/* Header */}
      <div className="border-b border-b-[var(--border)] p-6 w-full max-w-[80dvw]">
        <span className="flex gap-3 items-center">
          <ArrowLeft />
          <Link to="/dashboard">Voltar ao Dashboard</Link>
        </span>
      </div>

      {/* Form */}
      <div className="flex justify-center w-full">
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-8 w-full max-w-3xl"
        >
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <img 
              src={user?.profilePictureUrl} 
              alt="Profile picture" 
              className="w-40 h-40 rounded-full object-cover"
            />
            <FormInput
              type="text"
              value={updateForm.profilePictureUrl}
              label="Foto de Perfil"
              identifier="profilePicture"
              placeholder="https://images.unsplash.com/photo"
              className="w-full"
              onChangeAction={(e) => setUpdateForm({ ...updateForm, profilePictureUrl: e })}
            />
          </div>

          {/* Name & Email side by side */}
          <div className="flex flex-col flex-wrap gap-6">
            <div className="flex flex-col">
                <FormInput
                type="text"
                value={updateForm.name}
                label="Nome"
                identifier="name"
                placeholder="John Doe"
                onChangeAction={(e) => setUpdateForm({ ...updateForm, name: e })}
                />
            </div>

            <div className="flex flex-col">
                <FormInput
                type="text"
                value={updateForm.email}
                label="Email"
                identifier="email"
                placeholder="email@exemplo.com"
                onChangeAction={(e) => setUpdateForm({ ...updateForm, email: e })}
                />
            </div>
           
            
          </div>

          {/* Biography */}
          <div>
            <FormInput
            type="textarea"
            value={updateForm.biography}
            label="Biografia"
            identifier="biography"
            placeholder="Escreva algo sobre você"
            className="w-full"
            onChangeAction={(e) => setUpdateForm({ ...updateForm, biography: e })}
          />

          </div>
          

          <Button className="disabled:bg-cyan-900 disabled:cursor-not-allowed" disabled={disabled} onClickAction={() => {}}>Salvar alterações</Button>
        </form>
      </div>
    </div>
  );
}
