// datatable.js
(() => {
    // --- Sample data (you can fetch from API instead) ---
    let data = [
      { id: 1, name: 'Asha Sharma', email: 'asha@example.com', role: 'Admin' },
      { id: 2, name: 'Rahul Mehta', email: 'rahul@example.com', role: 'Manager' },
      { id: 3, name: 'Nisha Rao', email: 'nisha@example.com', role: 'Staff' },
      { id: 4, name: 'Vikram Singh', email: 'vikram@example.com', role: 'Staff' },
      { id: 5, name: 'Priya Kapoor', email: 'priya@example.com', role: 'Manager' },
      { id: 6, name: 'Anil Kumar', email: 'anil@example.com', role: 'Staff' },
      { id: 7, name: 'Rekha Iyer', email: 'rekha@example.com', role: 'Admin' },
      { id: 8, name: 'Sahil Gupta', email: 'sahil@example.com', role: 'Staff' },
      { id: 9, name: 'Meera Nair', email: 'meera@example.com', role: 'Staff' },
      { id: 10, name: 'Karan Patel', email: 'karan@example.com', role: 'Manager' },
      { id: 11, name: 'Leena Desai', email: 'leena@example.com', role: 'Staff' },
      { id: 12, name: 'Arjun Bose', email: 'arjun@example.com', role: 'Staff' }
    ];
  
    // --- state ---
    let filtered = [...data];
    let sortKey = 'id';
    let sortDir = 'asc'; // 'asc' | 'desc'
    let currentPage = 1;
    let pageSize = Number(document.getElementById('perPage').value) || 8;
  
    // --- DOM references ---
    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');
    const perPageSelect = document.getElementById('perPage');
    const tableInfo = document.getElementById('tableInfo');
    const paginationRoot = document.getElementById('pagination');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const addBtn = document.getElementById('addBtn');
    const modalOverlay = document.getElementById('modalOverlay');
  
    // --- helpers ---
    function compare(a, b, key) {
      const va = (a[key] ?? '').toString().toLowerCase();
      const vb = (b[key] ?? '').toString().toLowerCase();
      if (va < vb) return -1;
      if (va > vb) return 1;
      return 0;
    }
  
    function sortData() {
      filtered.sort((a, b) => {
        const res = compare(a, b, sortKey);
        return sortDir === 'asc' ? res : -res;
      });
    }
  
    function applyFilter() {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        filtered = [...data];
      } else {
        filtered = data.filter(item =>
          item.name.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.role.toLowerCase().includes(q) ||
          String(item.id).includes(q)
        );
      }
      currentPage = 1;
    }
  
    function paginate(items) {
      const start = (currentPage - 1) * pageSize;
      return items.slice(start, start + pageSize);
    }
  
    // --- render functions ---
    function renderTable() {
      sortData();
      const pageItems = paginate(filtered);
  
      // table rows
      tableBody.innerHTML = pageItems.map(row => `
        <tr class="hover:bg-gray-50">
          <td class="px-4 py-3 text-sm text-slate-700">${row.id}</td>
          <td class="px-4 py-3 text-sm font-medium text-slate-800">${escapeHtml(row.name)}</td>
          <td class="px-4 py-3 text-sm text-slate-600">${escapeHtml(row.email)}</td>
          <td class="px-4 py-3 text-sm text-slate-600">${escapeHtml(row.role)}</td>
          <td class="px-4 py-3 text-right">
            <div class="inline-flex items-center gap-2">
              <button data-action="view" data-id="${row.id}" class="px-2 py-1 rounded-md text-sm bg-white shadow-sm hover:bg-slate-50">View</button>
              <button data-action="edit" data-id="${row.id}" class="px-2 py-1 rounded-md text-sm bg-yellow-50 text-amber-700 hover:bg-amber-100">Edit</button>
              <button data-action="delete" data-id="${row.id}" class="px-2 py-1 rounded-md text-sm bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
            </div>
          </td>
        </tr>`).join('');
  
      renderInfo();
      renderPagination();
    }
  
    function renderInfo() {
      const total = filtered.length;
      const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
      const end = Math.min(total, currentPage * pageSize);
      tableInfo.textContent = `Showing ${start}-${end} of ${total} users`;
    }
  
    function renderPagination() {
      const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
      paginationRoot.innerHTML = '';
  
      // simple smart pagination: show up to 5 page buttons
      const maxPagesToShow = 5;
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxPagesToShow - 1);
      if (end - start < maxPagesToShow - 1) start = Math.max(1, end - maxPagesToShow + 1);
  
      for (let p = start; p <= end; p++) {
        const btn = document.createElement('button');
        btn.textContent = p;
        btn.className = `px-3 py-1 rounded-lg ${p === currentPage ? 'bg-brand text-white' : 'bg-white'}`;
        btn.addEventListener('click', () => {
          currentPage = p;
          renderTable();
        });
        paginationRoot.appendChild(btn);
      }
  
      prevPageBtn.disabled = currentPage === 1;
      nextPageBtn.disabled = currentPage === totalPages;
    }
  
    // --- UI interactions ---
    // header sorting
    document.querySelectorAll('#dataTable thead th[data-key]').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.getAttribute('data-key');
        if (sortKey === key) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
        else { sortKey = key; sortDir = 'asc'; }
        // update visual indicators
        document.querySelectorAll('#dataTable thead th').forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
        th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
        renderTable();
      });
    });
  
    // search
    searchInput.addEventListener('input', () => {
      applyFilter();
      renderTable();
    });
  
    // per page
    perPageSelect.addEventListener('change', () => {
      pageSize = Number(perPageSelect.value);
      currentPage = 1;
      renderTable();
    });
  
    // prev/next
    prevPageBtn.addEventListener('click', () => {
      if (currentPage > 1) { currentPage--; renderTable(); }
    });
    nextPageBtn.addEventListener('click', () => {
      const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
      if (currentPage < totalPages) { currentPage++; renderTable(); }
    });
  
    // action buttons (delegate)
    document.querySelector('#dataTable').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      const id = Number(btn.getAttribute('data-id'));
      if (action === 'view') openViewModal(id);
      if (action === 'edit') openAddEditModal('edit', id);
      if (action === 'delete') openDeleteConfirm(id);
    });
  
    // Add user
    addBtn.addEventListener('click', () => openAddEditModal('add'));
  
    // --- modal utilities ---
    function showModal(html) {
      modalOverlay.innerHTML = '';
      const panel = document.createElement('div');
      panel.className = 'bg-white rounded-2xl p-6 w-[720px] max-w-[95%] shadow-lg modal-panel';
      panel.innerHTML = html;
      modalOverlay.appendChild(panel);
  
      // show overlay
      modalOverlay.classList.remove('hidden');
      setTimeout(() => panel.classList.add('show'), 10);
  
      // close when clicking outside panel
      modalOverlay.addEventListener('click', function onBack(e) {
        if (e.target === modalOverlay) {
          closeModal();
          modalOverlay.removeEventListener('click', onBack);
        }
      }, { once: false });
    }
  
    function closeModal() {
      const panel = modalOverlay.firstElementChild;
      if (panel) panel.classList.remove('show');
      setTimeout(() => {
        modalOverlay.classList.add('hidden');
        modalOverlay.innerHTML = '';
      }, 160);
    }
  
    // --- modals for view / add / edit / delete ---
    function openViewModal(id) {
      const item = data.find(d => d.id === id);
      if (!item) return;
      const html = `
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-lg font-semibold">View User</h3>
          <button id="closeModalBtn" class="text-slate-400">✕</button>
        </div>
        <div class="space-y-3">
          <div><label class="text-xs text-slate-500">ID</label><div class="text-sm font-medium">${item.id}</div></div>
          <div><label class="text-xs text-slate-500">Name</label><div class="text-sm">${escapeHtml(item.name)}</div></div>
          <div><label class="text-xs text-slate-500">Email</label><div class="text-sm">${escapeHtml(item.email)}</div></div>
          <div><label class="text-xs text-slate-500">Role</label><div class="text-sm">${escapeHtml(item.role)}</div></div>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button id="closeView" class="px-4 py-2 rounded-lg bg-white border">Close</button>
        </div>
      `;
      showModal(html);
  
      document.getElementById('closeModalBtn').addEventListener('click', closeModal);
      document.getElementById('closeView').addEventListener('click', closeModal);
    }
  
    function openAddEditModal(mode = 'add', id) {
      let item = { id: null, name: '', email: '', role: '' };
      let title = 'Add User';
      if (mode === 'edit') {
        item = data.find(d => d.id === id) || item;
        title = 'Edit User';
      }
  
      const html = `
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-lg font-semibold">${title}</h3>
          <button id="closeModalBtn" class="text-slate-400">✕</button>
        </div>
  
        <form id="addEditForm" class="space-y-4">
          <div>
            <label class="text-xs text-slate-500">Name</label>
            <input name="name" value="${escapeAttr(item.name)}" required class="w-full mt-1 px-3 py-2 border rounded-lg" />
          </div>
  
          <div>
            <label class="text-xs text-slate-500">Email</label>
            <input name="email" value="${escapeAttr(item.email)}" required type="email" class="w-full mt-1 px-3 py-2 border rounded-lg" />
          </div>
  
          <div>
            <label class="text-xs text-slate-500">Role</label>
            <select name="role" class="w-full mt-1 px-3 py-2 border rounded-lg">
              <option ${item.role==='Admin' ? 'selected' : ''}>Admin</option>
              <option ${item.role==='Manager' ? 'selected' : ''}>Manager</option>
              <option ${item.role==='Staff' ? 'selected' : ''}>Staff</option>
            </select>
          </div>
  
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" id="cancel" class="px-4 py-2 rounded-lg bg-white border">Cancel</button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-brand text-white">${mode === 'add' ? 'Add' : 'Save'}</button>
          </div>
        </form>
      `;
      showModal(html);
  
      document.getElementById('closeModalBtn').addEventListener('click', closeModal);
      document.getElementById('cancel').addEventListener('click', closeModal);
  
      const form = document.getElementById('addEditForm');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const payload = {
          name: formData.get('name').trim(),
          email: formData.get('email').trim(),
          role: formData.get('role').trim() || 'Staff'
        };
        if (!payload.name || !payload.email) {
          alert('Please fill required fields.');
          return;
        }
  
        if (mode === 'add') {
          // generate new id
          const newId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
          data.push({ id: newId, ...payload });
        } else {
          const idx = data.findIndex(d => d.id === id);
          if (idx >= 0) {
            data[idx] = { id, ...payload };
          }
        }
  
        applyFilter();
        renderTable();
        closeModal();
      });
    }
  
    function openDeleteConfirm(id) {
      const item = data.find(d => d.id === id);
      if (!item) return;
      const html = `
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-lg font-semibold">Delete User</h3>
          <button id="closeModalBtn" class="text-slate-400">✕</button>
        </div>
  
        <div class="pt-2">
          <p>Are you sure you want to delete <strong>${escapeHtml(item.name)}</strong> (ID: ${item.id}) ? This action cannot be undone.</p>
        </div>
  
        <div class="mt-6 flex justify-end gap-3">
          <button id="cancel" class="px-4 py-2 rounded-lg bg-white border">Cancel</button>
          <button id="confirmDelete" class="px-4 py-2 rounded-lg bg-red-600 text-white">Delete</button>
        </div>
      `;
      showModal(html);
      document.getElementById('closeModalBtn').addEventListener('click', closeModal);
      document.getElementById('cancel').addEventListener('click', closeModal);
      document.getElementById('confirmDelete').addEventListener('click', () => {
        data = data.filter(d => d.id !== id);
        applyFilter();
        renderTable();
        closeModal();
      });
    }
  
    // small escape helpers
    function escapeHtml(s) {
      if (!s) return '';
      return String(s)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
    }
    function escapeAttr(s) {
      if (!s) return '';
      return String(s).replaceAll('"', '&quot;').replaceAll("'", '&#39;');
    }
  
    // --- initialization ---
    function init() {
      applyFilter();
      renderTable();
  
      // default sort indicator on ID
      const th = document.querySelector('#dataTable thead th[data-key="id"]');
      if (th) th.classList.add('sort-asc');
    }
  
    init();
  
  })();
  