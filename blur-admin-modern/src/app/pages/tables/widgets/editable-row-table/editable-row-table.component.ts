import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditableUser, GROUPS, GroupOption, STATUSES, StatusOption, USERS } from '../../tables.data';

interface UserDraft {
  name: string;
  status: number | null;
  group: number | null;
}

@Component({
  selector: 'app-editable-row-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editable-row-table.component.html',
})
export class EditableRowTableComponent {
  readonly users = signal<EditableUser[]>(USERS.map((user) => ({ ...user })));
  readonly statuses: StatusOption[] = STATUSES;
  readonly groups: GroupOption[] = GROUPS;
  readonly editing = signal<EditableUser | null>(null);
  readonly draft = signal<UserDraft>({ name: '', status: null, group: null });

  addUser(): void {
    const user: EditableUser = { id: this.users().length + 1, name: '', status: null, group: null };
    this.users.update((users) => [...users, user]);
    this.startEdit(user);
  }

  startEdit(user: EditableUser): void {
    this.editing.set(user);
    this.draft.set({ name: user.name, status: user.status ?? null, group: user.group ?? null });
  }

  setName(name: string): void {
    this.draft.update((draft) => ({ ...draft, name }));
  }

  setStatus(value: number | null): void {
    this.draft.update((draft) => ({ ...draft, status: value }));
  }

  setGroup(value: number | null): void {
    this.draft.update((draft) => ({ ...draft, group: value }));
  }

  showStatus(user: EditableUser): string {
    return this.statuses.find((status) => status.value === user.status)?.text ?? 'Not set';
  }

  showGroup(user: EditableUser): string {
    return this.groups.find((group) => group.id === user.group)?.text ?? 'Not set';
  }

  save(): void {
    const user = this.editing();
    if (!user || !this.draft().name.trim()) return;
    Object.assign(user, this.draft());
    this.users.set([...this.users()]);
    this.editing.set(null);
  }

  cancel(): void {
    this.editing.set(null);
  }

  removeUser(index: number): void {
    this.users.update((users) => users.filter((_, i) => i !== index));
  }
}
