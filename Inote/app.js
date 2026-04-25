const app = {
    notes: [],
    currentNoteId: null,
    
    init() {
        // Load notes from local storage
        const savedNotes = localStorage.getItem('sanctuary_notes');
        if (savedNotes) {
            this.notes = JSON.parse(savedNotes);
        } else {
            // Demo data for first time
            this.notes = [
                {
                    id: Date.now().toString(),
                    title: 'Sanctuary\'e Hoşgeldiniz',
                    content: 'Bu uygulama notlarınızı güvenle saklamanız için tasarlandı. İstediğiniz zaman yeni not ekleyebilir, silebilir veya düzenleyebilirsiniz. Notlarınız sadece bu cihazda tutulur.',
                    date: new Date().toISOString(),
                    tag: 'Kişisel'
                }
            ];
            this.saveToStorage();
        }

        // Load Theme
        const isDark = localStorage.getItem('sanctuary_theme') === 'dark';
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.getElementById('theme-toggle').checked = true;
            document.getElementById('theme-color-meta').setAttribute('content', '#0f172a'); // slate-900
        }

        // Search listener
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.renderNotes(e.target.value);
        });

        this.renderNotes();
    },

    saveToStorage() {
        localStorage.setItem('sanctuary_notes', JSON.stringify(this.notes));
    },

    formatDate(isoString) {
        const date = new Date(isoString);
        const today = new Date();
        const diffMs = today - date;
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffDays === 0) return 'Bugün';
        if (diffDays === 1) return 'Dün';
        if (diffDays < 7) return `${diffDays} gün önce`;
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
    },

    renderNotes(filterQuery = '') {
        const container = document.getElementById('notes-list');
        container.innerHTML = '';

        const filtered = this.notes.filter(n => 
            n.title.toLowerCase().includes(filterQuery.toLowerCase()) || 
            n.content.toLowerCase().includes(filterQuery.toLowerCase())
        ).sort((a, b) => new Date(b.date) - new Date(a.date));

        filtered.forEach((note, index) => {
            // Create a variety of cards based on index for the bento grid feel
            const isFeatured = index === 0 && filterQuery === ''; // First note is large
            const colSpan = isFeatured ? 'col-span-2' : 'col-span-1 sm:col-span-1';
            
            // Randomize background colors softly for smaller cards
            let bgClass = 'bg-surface-container-lowest dark:bg-slate-800';
            let titleClass = 'text-on-surface dark:text-white';
            let borderClass = 'border-surface-container-low dark:border-slate-700';
            
            if (!isFeatured) {
                const colorTypes = [
                    { bg: 'bg-primary-container/10 dark:bg-primary-container/20', text: 'text-primary dark:text-primary-fixed-dim', border: 'border-primary-container/20' },
                    { bg: 'bg-secondary-container/20 dark:bg-secondary-container/10', text: 'text-secondary dark:text-secondary-fixed', border: 'border-secondary-container/30 dark:border-slate-700' },
                    { bg: 'bg-surface-container-lowest dark:bg-slate-800', text: 'text-on-surface dark:text-white', border: 'border-surface-container-low dark:border-slate-700' }
                ];
                const type = colorTypes[index % 3];
                bgClass = type.bg;
                titleClass = type.text;
                borderClass = type.border;
            }

            const el = document.createElement('div');
            el.className = `${colSpan} ${bgClass} p-md rounded-2xl border ${borderClass} shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col min-h-[140px]`;
            el.onclick = () => this.openEditor(note.id);

            const contentPreview = note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '');

            el.innerHTML = `
                <div class="flex-1">
                    <h3 class="font-${isFeatured ? 'h3' : 'button'} text-${isFeatured ? 'h3' : 'button'} ${titleClass} mb-xs">${note.title || 'İsimsiz Not'}</h3>
                    <p class="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 line-clamp-${isFeatured ? '3' : '4'} leading-relaxed mt-1">
                        ${contentPreview}
                    </p>
                </div>
                <div class="mt-md flex items-center justify-between">
                    <div class="flex gap-2">
                        ${note.tag ? `<span class="bg-primary-container/20 text-primary px-3 py-1 rounded-full font-label-caps text-label-caps">${note.tag}</span>` : ''}
                    </div>
                    <span class="font-label-caps text-label-caps text-outline/60">${this.formatDate(note.date)}</span>
                </div>
            `;
            container.appendChild(el);
        });

        if (filtered.length === 0) {
            container.innerHTML = `<div class="col-span-2 text-center text-outline py-10">Kayıtlı not bulunamadı.</div>`;
        }
    },

    // --- Navigation & Routing ---
    
    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    },
    
    resetNavButtons() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('bg-[#8E94F2]/10', 'text-[#8E94F2]');
            btn.classList.add('text-slate-400', 'dark:text-slate-500');
            btn.querySelector('span.material-symbols-outlined').style.fontVariationSettings = "'FILL' 0";
        });
    },

    switchTab(tabId) {
        this.hideAllScreens();
        document.getElementById(`screen-${tabId}`).classList.add('active');
        document.getElementById('bottom-nav').style.display = 'flex'; // Show nav bar

        // Update Nav UI
        this.resetNavButtons();
        const activeBtn = document.getElementById(`nav-${tabId}`);
        if(activeBtn) {
            activeBtn.classList.remove('text-slate-400', 'dark:text-slate-500');
            activeBtn.classList.add('bg-[#8E94F2]/10', 'text-[#8E94F2]');
            activeBtn.querySelector('span.material-symbols-outlined').style.fontVariationSettings = "'FILL' 1";
        }
    },

    navToEditor() {
        this.openEditor(null); // Open empty
    },

    navToHome() {
        this.switchTab('home');
        this.renderNotes(); // Refresh list
    },

    // --- Editor Logic ---

    openEditor(id = null) {
        this.currentNoteId = id;
        this.hideAllScreens();
        document.getElementById('screen-editor').classList.add('active');
        document.getElementById('bottom-nav').style.display = 'none'; // Hide nav bar while editing

        const titleInput = document.getElementById('note-title');
        const contentInput = document.getElementById('note-content');
        const dateSpan = document.getElementById('note-date');

        if (id) {
            const note = this.notes.find(n => n.id === id);
            titleInput.value = note.title;
            contentInput.value = note.content;
            dateSpan.textContent = this.formatDate(note.date);
        } else {
            titleInput.value = '';
            contentInput.value = '';
            dateSpan.textContent = 'Şimdi';
            setTimeout(() => contentInput.focus(), 300); // Focus after animation
        }
    },

    saveNote() {
        const title = document.getElementById('note-title').value.trim();
        const content = document.getElementById('note-content').value.trim();

        if (!title && !content) {
            this.navToHome(); // Don't save empty notes
            return;
        }

        if (this.currentNoteId) {
            // Update
            const index = this.notes.findIndex(n => n.id === this.currentNoteId);
            if (index > -1) {
                this.notes[index].title = title;
                this.notes[index].content = content;
                this.notes[index].date = new Date().toISOString();
            }
        } else {
            // Create
            const newNote = {
                id: Date.now().toString(),
                title: title,
                content: content,
                date: new Date().toISOString(),
                tag: 'Kişisel'
            };
            this.notes.unshift(newNote); // Add to top
            this.currentNoteId = newNote.id;
        }

        this.saveToStorage();
        
        // Show indicator
        const indicator = document.getElementById('save-indicator');
        indicator.style.opacity = '1';
        setTimeout(() => indicator.style.opacity = '0', 2000);
    },

    deleteCurrentNote() {
        if (!this.currentNoteId) {
            this.navToHome();
            return;
        }
        
        if(confirm('Bu notu silmek istediğinize emin misiniz?')) {
            this.notes = this.notes.filter(n => n.id !== this.currentNoteId);
            this.saveToStorage();
            this.navToHome();
        }
    },

    // --- Settings Logic ---

    toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('sanctuary_theme', isDark ? 'dark' : 'light');
        document.getElementById('theme-color-meta').setAttribute('content', isDark ? '#0f172a' : '#f8f9ff');
    },

    clearAllData() {
        if(confirm('Tüm notlarınız kalıcı olarak silinecektir. Emin misiniz?')) {
            this.notes = [];
            this.saveToStorage();
            this.renderNotes();
            alert('Veriler temizlendi.');
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
