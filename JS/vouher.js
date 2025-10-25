// table.js - Table related functionality

// Voucher Data
const voucherData = [
    {
        voucherNo: "CRV00003",
        date: "23-07-2023",
        status: "Updated",
        type: "CR",
        refDocument: "ORD00005",
        createdBy: "Rati Krishna Moharana",
    },
    {
        voucherNo: "CRV00004",
        date: "23-07-2023",
        status: "Updated",
        type: "CR",
        refDocument: "INV2300005",
        createdBy: "Santosh Moharana",
    },
    {
        voucherNo: "CRV00005",
        date: "24-07-2023",
        status: "Updated",
        type: "CR",
        refDocument: "ORD00009",
        createdBy: "Santosh Moharana",
    },
    {
        voucherNo: "CRV00006",
        date: "25-07-2023",
        status: "Updated",
        type: "CR",
        refDocument: "ORD00010",
        createdBy: "Rati Krishna Moharana",
    },
];

// Table state
let currentPage = 0;
let pageSize = 10;
let filteredData = [...voucherData];
let sortColumn = null;
let sortDirection = 'asc';

// Initialize table functionality
function initializeTable() {
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('productTableBody');
    if (!tbody) {
        console.log('Table body not found, skipping table render');
        return;
    }
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredData.slice(startIndex, endIndex);

    tbody.innerHTML = pageData.map(voucher => `
        <tr class="fade-in hover:bg-gray-50">
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <input class="row-checkbox w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500" type="checkbox" value="${voucher.id}">
                </div>
            </td>
            <td class="px-6 py-4 text-gray-900 text-sm">${voucher.voucherNo}</td>
            <td class="px-6 py-4 text-gray-900 text-sm">${voucher.date}</td>
            <td class="px-6 py-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${voucher.status === 'Updated' ? 'badge-success' : 'badge-danger'}">
                    ${voucher.status}
                </span>
            </td>
            <td class="px-6 py-4 text-gray-900 text-sm">${voucher.type}</td>
            <td class="px-6 py-4 text-gray-900 text-sm">${voucher.refDocument}</td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <div class="flex flex-col">
                        <a href="#!" class="text-gray-900 font-semibold hover:text-primary-500 text-sm">${voucher.createdBy}</a>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="flex items-center space-x-1 action-buttons">
                    <div class="tooltip">
                        <button class="btn-ghost btn-icon rounded-full">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                        <div class="tooltip-text">View</div>
                    </div>
                    <div class="tooltip">
                        <button class="btn-ghost btn-icon rounded-full">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <div class="tooltip-text">Edit</div>
                </div>
                    <div class="tooltip">
                        <button class="btn-ghost btn-icon rounded-full">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                        <div class="tooltip-text">Delete</div>
                        </div>
                        </div>
            </td>
        </tr>
    `).join('');

    updatePaginationInfo();
    renderPagination();
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) {
        console.log('Search input not found, skipping search initialization');
        return;
    }
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filteredData = voucherData.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.status.toLowerCase().includes(searchTerm)
        );
        currentPage = 0;
        renderTable();
    });
}

// Sorting functionality
function initializeSorting() {
    const sortableHeaders = document.querySelectorAll('.sorting');
    
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.dataset.sort;
            if (!column) return;
            
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'asc';
            }
            
            sortData(column, sortDirection);
            updateSortIcons();
            renderTable();
        });
    });
}

function sortData(column, direction) {
    filteredData.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        
        if (column === 'price') {
            aVal = parseFloat(aVal.replace('$', ''));
            bVal = parseFloat(bVal.replace('$', ''));
        } else if (column === 'quantity') {
            aVal = parseInt(aVal);
            bVal = parseInt(bVal);
        } else {
            aVal = aVal.toString().toLowerCase();
            bVal = bVal.toString().toLowerCase();
        }
        
        if (direction === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
}

function updateSortIcons() {
    const headers = document.querySelectorAll('.sorting');
    headers.forEach(header => {
        const existingIcon = header.querySelector('.sort-icon');
        if (existingIcon) existingIcon.remove();
        
        if (header.dataset.sort === sortColumn) {
            const sortIcon = document.createElement('span');
            sortIcon.className = `sort-icon ${sortDirection}`;
            header.appendChild(sortIcon);
        }
    });
}

// Pagination functionality
function initializePagination() {
    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) {
        console.log('Pagination element not found, skipping pagination render');
        return;
    }
    const totalPages = Math.ceil(filteredData.length / pageSize);
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-200 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}" 
                ${currentPage === 0 ? 'disabled' : ''} data-page="${currentPage - 1}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"></path>
            </svg>
        </button>
    `;
    
    // Page numbers with proper spacing
    for (let i = 0; i < totalPages; i++) {
        const isFirst = i === 0;
        const isLast = i === totalPages - 1;
        const isActive = i === currentPage;
        
        let buttonClasses = 'px-3 py-2 text-sm font-medium border-t border-b border-gray-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-200';
        
        if (isFirst) {
            buttonClasses += ' border-l border-gray-300';
        }
        if (isLast) {
            buttonClasses += ' border-r border-gray-300';
        }
        if (isActive) {
            buttonClasses += ' bg-primary-500 text-white border-primary-500';
        } else {
            buttonClasses += ' bg-white text-gray-500';
        }
        
        paginationHTML += `
            <button class="${buttonClasses}" data-page="${i}">${i + 1}</button>
        `;
    }
    
    // Next button
    paginationHTML += `
        <button class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-200 ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}" 
                ${currentPage === totalPages - 1 ? 'disabled' : ''} data-page="${currentPage + 1}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
    
    // Add click event listeners
    pagination.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
            const page = parseInt(e.target.dataset.page);
            if (page >= 0 && page < totalPages) {
                currentPage = page;
                renderTable();
            }
        }
    });
}

function updatePaginationInfo() {
    const paginationInfo = document.getElementById('paginationInfo');
    if (!paginationInfo) {
        console.log('Pagination info element not found, skipping pagination info update');
        return;
    }
    const startIndex = currentPage * pageSize + 1;
    const endIndex = Math.min((currentPage + 1) * pageSize, filteredData.length);
    const total = filteredData.length;
    
    paginationInfo.textContent = 
        `Showing ${startIndex} to ${endIndex} of ${total} entries`;
}

// Checkbox functionality
function initializeCheckboxes() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    if (!selectAllCheckbox) {
        console.log('Select all checkbox not found, skipping checkbox initialization');
        return;
    }
    
    selectAllCheckbox.addEventListener('change', function() {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
    
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
            selectAllCheckbox.checked = checkedCount === rowCheckboxes.length;
            selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < rowCheckboxes.length;
        });
    });
}

// Keyboard shortcuts for table
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
});