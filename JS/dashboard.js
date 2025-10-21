// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eef3fa',
                    100: '#d0dbe9',
                    200: '#a7b9d3',
                    300: '#7594bb',
                    400: '#39699f',
                    500: '#024b83',
                    600: '#013a68',
                    700: '#013057',
                    800: '#01284c',
                    900: '#01223f',
                },
                gray: {
                    50: '#fcfdfd',
                    100: '#f9fafb',
                    200: '#f4f6f8',
                    300: '#dfe3e8',
                    400: '#c4cdd5',
                    500: '#919eab',
                    600: '#637381',
                    700: '#454f5b',
                    800: '#1c252e',
                    900: '#141a21',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            borderRadius: {
                'xl': '0.75rem',
            }
        }
    }
};

// Product data
const productData = [
    {
        id: "1",
        name: "Transparent Sunglasses",
        category: "Accessories",
        addedDate: "19 July, 2025",
        price: "$65.29",
        quantity: 235,
        status: "Active",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "2",
        name: "Frames Still Life Glasses",
        category: "Bags",
        addedDate: "19 July, 2025",
        price: "$15.99",
        quantity: 56,
        status: "Active",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "3",
        name: "Slightly Rounded Frame",
        category: "Men's Fashion",
        addedDate: "19 July, 2025",
        price: "$12.39",
        quantity: 67,
        status: "Deactive",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "4",
        name: "Colored-Transparent Sunglasses",
        category: "Women's Fashion",
        addedDate: "18 July, 2025",
        price: "$35.99",
        quantity: 24,
        status: "Active",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "5",
        name: "Sun Glasses Table",
        category: "Accessories",
        addedDate: "17 July, 2025",
        price: "$65.29",
        quantity: 32,
        status: "Active",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "6",
        name: "Rounded Frames Glasses",
        category: "Bags",
        addedDate: "20 July, 2025",
        price: "$45.29",
        quantity: 45,
        status: "Active",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "7",
        name: "Transparent Sunglasses",
        category: "Accessories",
        addedDate: "19 July, 2025",
        price: "$65.29",
        quantity: 235,
        status: "Active",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "8",
        name: "Frames Still Life Glasses",
        category: "Bags",
        addedDate: "19 July, 2025",
        price: "$15.99",
        quantity: 56,
        status: "Active",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "9",
        name: "Slightly Rounded Frame",
        category: "Men's Fashion",
        addedDate: "19 July, 2025",
        price: "$12.39",
        quantity: 67,
        status: "Deactive",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "10",
        name: "Colored-Transparent Sunglasses",
        category: "Women's Fashion",
        addedDate: "18 July, 2025",
        price: "$35.99",
        quantity: 24,
        status: "Active",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "11",
        name: "Transparent Sunglasses",
        category: "Accessories",
        addedDate: "19 July, 2025",
        price: "$65.29",
        quantity: 235,
        status: "Active",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "12",
        name: "Frames Still Life Glasses",
        category: "Bags",
        addedDate: "19 July, 2025",
        price: "$15.99",
        quantity: 56,
        status: "Active",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    },
    {
        id: "13",
        name: "Slightly Rounded Frame",
        category: "Men's Fashion",
        addedDate: "19 July, 2025",
        price: "$12.39",
        quantity: 67,
        status: "Deactive",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=56&h=56&fit=crop"
    }
];

// Table state
let currentPage = 0;
let pageSize = 10;
let filteredData = [...productData];
let sortColumn = null;
let sortDirection = 'asc';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing sidebar...');
    initializeSidebar();
    initializeTable();
    initializeSearch();
    initializeSorting();
    initializePagination();
    initializeCheckboxes();
    initializeDropdowns();
});

// Sidebar functionality
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const collapseMini = document.getElementById('collapseMini');
    const collapseExpanded = document.getElementById('collapseExpanded');

    console.log('Sidebar toggle element:', sidebarToggle);
    console.log('Collapse mini element:', collapseMini);
    console.log('Collapse expanded element:', collapseExpanded);

    if (!sidebarToggle) {
        console.error('Sidebar toggle button not found!');
        return;
    }

    // Desktop toggle - like React project
    sidebarToggle.addEventListener('click', function() {
        console.log('Sidebar toggle clicked!');
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
        
        if (sidebar.classList.contains('collapsed')) {
            // Show right arrow when collapsed
            collapseMini.classList.add('hidden');
            collapseExpanded.classList.remove('hidden');
            console.log('Sidebar collapsed - showing right arrow');
            
            // Adjust main content for collapsed sidebar
            mainContent.style.marginLeft = '80px';
            mainContent.style.width = 'calc(100% - 80px)';
        } else {
            // Show left arrow when expanded
            collapseMini.classList.remove('hidden');
            collapseExpanded.classList.add('hidden');
            console.log('Sidebar expanded - showing left arrow');
            
            // Adjust main content for expanded sidebar
            mainContent.style.marginLeft = '280px';
            mainContent.style.width = 'calc(100% - 280px)';
        }
    });

    // Mobile toggle
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 1024) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
}

// Table functionality
function initializeTable() {
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('productTableBody');
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredData.slice(startIndex, endIndex);

    tbody.innerHTML = pageData.map(product => `
        <tr class="fade-in hover:bg-gray-50">
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <input class="row-checkbox w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500" type="checkbox" value="${product.id}">
            </div>
            </td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <img src="${product.imageSrc}" alt="${product.name}" class="w-14 h-14 rounded-lg object-cover mr-3 product-image">
                    <div class="flex flex-col">
                        <a href="#!" class="text-gray-900 font-semibold hover:text-primary-500 text-sm">${product.name}</a>
                        </div>
                        </div>
            </td>
            <td class="px-6 py-4 text-gray-900 text-sm">${product.category}</td>
            <td class="px-6 py-4 text-gray-900 text-sm">${product.addedDate}</td>
            <td class="px-6 py-4 text-gray-900 text-sm">${product.price}</td>
            <td class="px-6 py-4 text-gray-900 text-sm">${product.quantity}</td>
            <td class="px-6 py-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${product.status === 'Active' ? 'badge-success' : 'badge-danger'}">
                    ${product.status}
                </span>
            </td>
            <td class="px-6 py-4">
                <div class="flex items-center space-x-1 action-buttons">
                    <div class="tooltip">
                        <button class="btn-ghost btn-icon rounded-full" title="View">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                        <div class="tooltip-text">View</div>
                    </div>
                    <div class="tooltip">
                        <button class="btn-ghost btn-icon rounded-full" title="Edit">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <div class="tooltip-text">Edit</div>
                </div>
                    <div class="tooltip">
                        <button class="btn-ghost btn-icon rounded-full" title="Delete">
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
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filteredData = productData.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
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
    const startIndex = currentPage * pageSize + 1;
    const endIndex = Math.min((currentPage + 1) * pageSize, filteredData.length);
    const total = filteredData.length;
    
    document.getElementById('paginationInfo').textContent = 
        `Showing ${startIndex} to ${endIndex} of ${total} entries`;
}

// Checkbox functionality
function initializeCheckboxes() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
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

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// Responsive handling
function handleResponsive() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (window.innerWidth < 1024) {
        // Mobile view
        sidebar.classList.remove('show');
        mainContent.style.marginLeft = '0';
        mainContent.style.width = '100%';
    } else {
        // Desktop view
        sidebar.classList.remove('show');
        if (sidebar.classList.contains('collapsed')) {
            // Sidebar collapsed - table shifts left
            mainContent.style.marginLeft = '80px';
            mainContent.style.width = 'calc(100% - 80px)';
        } else {
            // Sidebar expanded - table shifts right
            mainContent.style.marginLeft = '280px';
            mainContent.style.width = 'calc(100% - 280px)';
        }
    }
}

// Dropdown functionality
function initializeDropdowns() {
    console.log('Initializing dropdowns...');
    
    // Admin dropdown
    const adminDropdownToggle = document.getElementById('adminDropdownToggle');
    const adminSubmenu = document.getElementById('adminSubmenu');
    const adminArrow = document.getElementById('adminArrow');
    
    if (adminDropdownToggle && adminSubmenu && adminArrow) {
        console.log('Admin dropdown found');
        adminDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isCurrentlyOpen = !adminSubmenu.classList.contains('hidden');
            
            // Close all other dropdowns first
            closeAllDropdowns();
            
            // Toggle current dropdown
            if (isCurrentlyOpen) {
                // If it was open, keep it closed
                adminSubmenu.classList.add('hidden');
                adminArrow.classList.remove('rotated');
            } else {
                // If it was closed, open it
                adminSubmenu.classList.remove('hidden');
                adminArrow.classList.add('rotated');
            }
        });
    }

    // Accounts dropdown
    const accountsDropdownToggle = document.getElementById('accountsDropdownToggle');
    const accountsSubmenu = document.getElementById('accountsSubmenu');
    const accountsArrow = document.getElementById('accountsArrow');
    
    if (accountsDropdownToggle && accountsSubmenu && accountsArrow) {
        console.log('Accounts dropdown found');
        accountsDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isCurrentlyOpen = !accountsSubmenu.classList.contains('hidden');
            
            // Close all other dropdowns first
            closeAllDropdowns();
            
            // Toggle current dropdown
            if (isCurrentlyOpen) {
                // If it was open, keep it closed
                accountsSubmenu.classList.add('hidden');
                accountsArrow.classList.remove('rotated');
            } else {
                // If it was closed, open it
                accountsSubmenu.classList.remove('hidden');
                accountsArrow.classList.add('rotated');
            }
        });
    }

    // Exchange dropdown
    const exchangeDropdownToggle = document.getElementById('exchangeDropdownToggle');
    const exchangeSubmenu = document.getElementById('exchangeSubmenu');
    const exchangeArrow = document.getElementById('exchangeArrow');
    
    if (exchangeDropdownToggle && exchangeSubmenu && exchangeArrow) {
        console.log('Exchange dropdown found');
        exchangeDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isCurrentlyOpen = !exchangeSubmenu.classList.contains('hidden');
            
            // Close all other dropdowns first
            closeAllDropdowns();
            
            // Toggle current dropdown
            if (isCurrentlyOpen) {
                // If it was open, keep it closed
                exchangeSubmenu.classList.add('hidden');
                exchangeArrow.classList.remove('rotated');
            } else {
                // If it was closed, open it
                exchangeSubmenu.classList.remove('hidden');
                exchangeArrow.classList.add('rotated');
            }
        });
    }

    // Inventory dropdown
    const inventoryDropdownToggle = document.getElementById('inventoryDropdownToggle');
    const inventorySubmenu = document.getElementById('inventorySubmenu');
    const inventoryArrow = document.getElementById('inventoryArrow');
    
    if (inventoryDropdownToggle && inventorySubmenu && inventoryArrow) {
        console.log('Inventory dropdown found');
        inventoryDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isCurrentlyOpen = !inventorySubmenu.classList.contains('hidden');
            
            // Close all other dropdowns first
            closeAllDropdowns();
            
            // Toggle current dropdown
            if (isCurrentlyOpen) {
                // If it was open, keep it closed
                inventorySubmenu.classList.add('hidden');
                inventoryArrow.classList.remove('rotated');
            } else {
                // If it was closed, open it
                inventorySubmenu.classList.remove('hidden');
                inventoryArrow.classList.add('rotated');
            }
        });
    }

    // Orders dropdown
    const ordersDropdownToggle = document.getElementById('ordersDropdownToggle');
    const ordersSubmenu = document.getElementById('ordersSubmenu');
    const ordersArrow = document.getElementById('ordersArrow');
    
    if (ordersDropdownToggle && ordersSubmenu && ordersArrow) {
        console.log('Orders dropdown found');
        ordersDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isCurrentlyOpen = !ordersSubmenu.classList.contains('hidden');
            
            // Close all other dropdowns first
            closeAllDropdowns();
            
            // Toggle current dropdown
            if (isCurrentlyOpen) {
                // If it was open, keep it closed
                ordersSubmenu.classList.add('hidden');
                ordersArrow.classList.remove('rotated');
            } else {
                // If it was closed, open it
                ordersSubmenu.classList.remove('hidden');
                ordersArrow.classList.add('rotated');
            }
        });
    }

    // Reports dropdown
    const reportsDropdownToggle = document.getElementById('reportsDropdownToggle');
    const reportsSubmenu = document.getElementById('reportsSubmenu');
    const reportsArrow = document.getElementById('reportsArrow');
    
    if (reportsDropdownToggle && reportsSubmenu && reportsArrow) {
        console.log('Reports dropdown found');
        reportsDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isCurrentlyOpen = !reportsSubmenu.classList.contains('hidden');
            
            // Close all other dropdowns first
            closeAllDropdowns();
            
            // Toggle current dropdown
            if (isCurrentlyOpen) {
                // If it was open, keep it closed
                reportsSubmenu.classList.add('hidden');
                reportsArrow.classList.remove('rotated');
            } else {
                // If it was closed, open it
                reportsSubmenu.classList.remove('hidden');
                reportsArrow.classList.add('rotated');
            }
        });
    }

    // User dropdown - Simple and direct approach
    function initUserDropdown() {
        const userDropdownToggle = document.getElementById('userDropdownToggle');
        const userDropdown = document.getElementById('userDropdown');
        
        console.log('Initializing user dropdown...');
        console.log('Toggle element:', userDropdownToggle);
        console.log('Menu element:', userDropdown);
        
        if (userDropdownToggle && userDropdown) {
            console.log('User dropdown elements found!');
            
            userDropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('User dropdown clicked!');
                
                // Close all other dropdowns first
                document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                    if (dropdown !== userDropdown) {
                        dropdown.classList.remove('show');
                    }
                });
                
                // Toggle current dropdown
                userDropdown.classList.toggle('show');
                console.log('Dropdown show class:', userDropdown.classList.contains('show'));
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!userDropdownToggle.contains(e.target) && !userDropdown.contains(e.target)) {
                    userDropdown.classList.remove('show');
                }
            });
            
        } else {
            console.error('User dropdown elements not found!');
        }
    }
    
    // Initialize user dropdown
    initUserDropdown();

    // Export dropdown
    const exportDropdownToggle = document.getElementById('exportDropdownToggle');
    const exportDropdown = document.getElementById('exportDropdown');
    
    console.log('Export dropdown toggle:', exportDropdownToggle);
    console.log('Export dropdown menu:', exportDropdown);
    
    if (exportDropdownToggle && exportDropdown) {
        console.log('Export dropdown found, adding event listener');
        exportDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Export dropdown clicked');
            exportDropdown.classList.toggle('show');
            console.log('Export dropdown show class:', exportDropdown.classList.contains('show'));
        });
    } else {
        console.error('Export dropdown elements not found!');
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
        
        // Close sidebar dropdowns when clicking outside
        if (!e.target.closest('nav')) {
            closeAllDropdowns();
        }
    });
}

// Function to close all sidebar dropdowns
function closeAllDropdowns() {
    const dropdowns = [
        { submenu: 'adminSubmenu', arrow: 'adminArrow' },
        { submenu: 'accountsSubmenu', arrow: 'accountsArrow' },
        { submenu: 'exchangeSubmenu', arrow: 'exchangeArrow' },
        { submenu: 'inventorySubmenu', arrow: 'inventoryArrow' },
        { submenu: 'ordersSubmenu', arrow: 'ordersArrow' },
        { submenu: 'reportsSubmenu', arrow: 'reportsArrow' }
    ];
    
    dropdowns.forEach(({ submenu, arrow }) => {
        const submenuElement = document.getElementById(submenu);
        const arrowElement = document.getElementById(arrow);
        
        if (submenuElement && arrowElement) {
            submenuElement.classList.add('hidden');
            arrowElement.classList.remove('rotated');
        }
    });
}

window.addEventListener('resize', handleResponsive);
handleResponsive();

// ===== Overview Section JS (appended, guarded to avoid overrides) =====
(function() {
    // Only initialize once
    if (window.__dashboardOverviewInit) return;
    window.__dashboardOverviewInit = true;

    // Create functions if not already defined (to support overview.html inline handlers)
    if (typeof window.setActiveTab !== 'function') {
        window.setActiveTab = function(tabName) {
            const sections = ['current-rate', 'calculator', 'history', 'set-rate'];
            sections.forEach(name => {
                const section = document.getElementById(name + '-section');
                if (section) section.classList.add('hidden');
            });
            document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                tab.classList.remove('bg-blue-600', 'text-white');
                tab.classList.add('bg-white', 'text-gray-900', 'hover:bg-gray-100');
            });
            const activeSection = document.getElementById(tabName + '-section');
            if (activeSection) activeSection.classList.remove('hidden');
            const activeTabEl = document.getElementById('tab-' + tabName);
            if (activeTabEl) {
                activeTabEl.classList.remove('bg-white', 'text-gray-900', 'hover:bg-gray-100');
                activeTabEl.classList.add('bg-blue-600', 'text-white');
            }
        };
    }

    if (typeof window.handleCategoryChange !== 'function') {
        window.handleCategoryChange = function() {
            const categorySelect = document.getElementById('category-select');
            const itemSelect = document.getElementById('item-select');
            if (!categorySelect || !itemSelect) return;

            const selectedCategory = categorySelect.value;
            itemSelect.innerHTML = '<option value="" disabled selected hidden></option>';
            itemSelect.disabled = true;

            const itemsMap = {
                rings: [
                    { value: 'diamond-ring', label: 'Diamond Ring' },
                    { value: 'gold-band', label: 'Gold Band' },
                ],
                necklaces: [
                    { value: 'pearl-necklace', label: 'Pearl Necklace' },
                    { value: 'gold-chain', label: 'Gold Chain' },
                ],
                earrings: [
                    { value: 'stud-earrings', label: 'Stud Earrings' },
                    { value: 'hoop-earrings', label: 'Hoop Earrings' },
                ],
                bracelets: [
                    { value: 'tennis-bracelet', label: 'Tennis Bracelet' },
                    { value: 'charm-bracelet', label: 'Charm Bracelet' },
                ],
            };

            if (selectedCategory && itemsMap[selectedCategory]) {
                itemSelect.disabled = false;
                itemsMap[selectedCategory].forEach(function(item) {
                    const option = document.createElement('option');
                    option.value = item.value;
                    option.textContent = item.label;
                    itemSelect.appendChild(option);
                });
            }
            const calcContent = document.getElementById('calculator-content');
            if (calcContent) calcContent.classList.add('hidden');
        };
    }

    if (typeof window.handleItemChange !== 'function') {
        window.handleItemChange = function() {
            const itemSelect = document.getElementById('item-select');
            const calcContent = document.getElementById('calculator-content');
            if (!itemSelect || !calcContent) return;
            if (itemSelect.value) {
                calcContent.classList.remove('hidden');
            } else {
                calcContent.classList.add('hidden');
            }
        };
    }

    if (typeof window.handleHistoryDateChange !== 'function') {
        window.handleHistoryDateChange = function() {
            const historyDateInput = document.getElementById('history-date');
            const historyContent = document.getElementById('history-content');
            if (!historyDateInput || !historyContent) return;
            if (historyDateInput.value) {
                historyContent.classList.remove('hidden');
            } else {
                historyContent.classList.add('hidden');
            }
        };
    }

    if (typeof window.updateRate !== 'function') {
        function showToast(message) {
            var toast = document.getElementById('inline-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'inline-toast';
                toast.className = 'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-elegant text-white bg-green-600';
                document.body.appendChild(toast);
            }
            toast.textContent = message;
            toast.classList.remove('hidden');
            toast.style.opacity = '1';
            setTimeout(function() {
                toast.style.transition = 'opacity 300ms ease';
                toast.style.opacity = '0';
                setTimeout(function() { toast.classList.add('hidden'); }, 300);
            }, 1800);
        }

        window.updateRate = function() {
            var rateInput = document.getElementById('today-rate');
            if (!rateInput) return;
            var value = rateInput.value;
            if (value) {
                showToast('Gold rate updated successfully');
                rateInput.value = '';
            } else {
                alert('Please enter a valid rate');
            }
        };
    }

    // Add missing user dropdown functions
    if (typeof window.changePassword !== 'function') {
        window.changePassword = function() {
            var userDropdown = document.getElementById('userDropdown');
            if (userDropdown) userDropdown.classList.remove('show');
            alert("Change Password functionality would be implemented here");
        };
    }

    if (typeof window.logout !== 'function') {
        window.logout = function() {
            var userDropdown = document.getElementById('userDropdown');
            if (userDropdown) userDropdown.classList.remove('show');
            if (confirm("Are you sure you want to logout?")) {
                alert("Logout successful! Redirecting to login page...");
                // In a real app, this would redirect to login page
            }
        };
    }

    // Debug function to test dropdown
    window.testDropdown = function() {
        var toggle = document.getElementById('userDropdownToggle');
        var menu = document.getElementById('userDropdown');
        console.log('Toggle element:', toggle);
        console.log('Menu element:', menu);
        if (menu) {
            menu.classList.toggle('show');
            console.log('Dropdown show class:', menu.classList.contains('show'));
        }
    };

    // Simple toggle function for inline onclick
    window.toggleUserDropdown = function() {
        var userDropdown = document.getElementById('userDropdown');
        if (userDropdown) {
            userDropdown.classList.toggle('show');
            console.log('Dropdown toggled! Show class:', userDropdown.classList.contains('show'));
        } else {
            console.error('User dropdown not found!');
        }
    };

    // Calculator rendering using same defaults
    (function initOverviewCalculations() {
        var weight = 15.50;
        var rate = 10480;
        var discount = 5;

        function calculate() {
            var amount = weight * rate;
            var discountAmount = (amount * discount) / 100;
            var totalAmount = amount - discountAmount;
            var gst = (totalAmount * 3) / 100;
            var netPayable = totalAmount + gst;
            return { amount: amount, totalAmount: totalAmount, gst: gst, netPayable: netPayable };
        }

        function updateDisplay() {
            var res = calculate();
            var amountElement = document.querySelector('#calculator-content .text-blue-600');
            if (amountElement) amountElement.textContent = '₹' + res.amount.toFixed(2);

            var totalAmountElement = document.querySelector('#calculator-content .text-2xl.font-bold.text-blue-600');
            if (totalAmountElement) totalAmountElement.textContent = '₹' + res.totalAmount.toFixed(2);

            var gstElements = document.querySelectorAll('#calculator-content .text-2xl.font-bold.text-blue-600');
            if (gstElements.length > 1) gstElements[1].textContent = '₹' + res.gst.toFixed(2);

            var netPayableElement = document.querySelector('#calculator-content .text-3xl.font-extrabold.text-green-600');
            if (netPayableElement) netPayableElement.textContent = '₹' + res.netPayable.toFixed(2);
        }

        // Initialize once DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateDisplay);
        } else {
            updateDisplay();
        }
    })();

    // Floating labels for selects and inputs
    function initializeFloatingLabels() {
        function setupFloatingSelect(selectId) {
            var sel = document.getElementById(selectId);
            if (!sel) return;
            var lbl = document.querySelector('label[for="' + selectId + '"]');
            if (!lbl) return;
            function update() {
                if (sel.value && sel.value !== '') {
                    lbl.classList.add('floated');
                } else {
                    lbl.classList.remove('floated');
                }
            }
            update();
            sel.addEventListener('change', update);
            sel.addEventListener('input', update);
            sel.addEventListener('focus', function() { lbl.classList.add('floated'); });
            sel.addEventListener('blur', update);
        }

        var floatingInputs = document.querySelectorAll('.floating-input input');
        floatingInputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                if (this.nextElementSibling) this.nextElementSibling.classList.add('transform', '-translate-y-6', 'scale-75', 'text-blue-600');
            });
            input.addEventListener('blur', function() {
                if (!this.value && this.nextElementSibling) {
                    this.nextElementSibling.classList.remove('transform', '-translate-y-6', 'scale-75', 'text-blue-600');
                }
            });
            if (input.value && input.nextElementSibling) {
                input.nextElementSibling.classList.add('transform', '-translate-y-6', 'scale-75', 'text-blue-600');
            }
        });

        setupFloatingSelect('category-select');
        setupFloatingSelect('item-select');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFloatingLabels);
    } else {
        initializeFloatingLabels();
    }

    // Initialize gold rate cards
    function initializeGoldRateCards() {
        var goldRates = [
            { karat: '24K', rate: 11433 },
            { karat: '22K', rate: 10480 },
            { karat: '20K', rate: 9528 },
            { karat: '18K', rate: 8575 },
            { karat: '16K', rate: 7622 },
            { karat: '14K', rate: 6669 },
            { karat: '12K', rate: 5716 },
        ];
        var cards = document.querySelectorAll('.gold-rate-card');
        cards.forEach(function(card, index) {
            if (goldRates[index]) {
                var rate = goldRates[index];
                var rateElement = card.querySelector('.text-3xl');
                var karatElement = card.querySelector('.text-sm.font-semibold');
                if (rateElement) rateElement.textContent = (rate.rate).toLocaleString();
                if (karatElement) karatElement.textContent = 'Gold : ' + rate.karat;
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGoldRateCards);
    } else {
        initializeGoldRateCards();
    }
})();