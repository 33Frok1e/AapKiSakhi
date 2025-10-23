// dashboard.js - Main functionality (sidebar, dropdowns, etc.)

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

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing dashboard...');
    initializeSidebar();
    initializeDropdowns();
    
    // Initialize table functionality if table exists
    if (typeof initializeTable !== 'undefined') {
        initializeTable();
        initializeSearch();
        initializeSorting();
        initializePagination();
        initializeCheckboxes();
    }
    
    // Debug: Test if elements exist
    console.log('=== DEBUGGING DROPDOWNS ===');
    console.log('User dropdown toggle:', document.getElementById('userDropdownToggle'));
    console.log('User dropdown menu:', document.getElementById('userDropdown'));
    console.log('Admin dropdown toggle:', document.getElementById('adminDropdownToggle'));
    console.log('Admin submenu:', document.getElementById('adminSubmenu'));
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

// Dropdown functionality - SUPER SIMPLE APPROACH
function initializeDropdowns() {
    console.log('Initializing dropdowns...');
    
    // Wait a bit for DOM to be fully ready
    setTimeout(function() {
        setupUserDropdown();
        setupSidebarDropdowns();
        setupOutsideClick();
    }, 100);
}

function setupUserDropdown() {
    const userToggle = document.getElementById('userDropdownToggle');
    const userMenu = document.getElementById('userDropdown');
    
    console.log('Setting up user dropdown:', userToggle, userMenu);
    
    if (userToggle && userMenu) {
        userToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('User dropdown clicked!');
            
            // Close sidebar menus first
            closeAllSidebarMenus();
            
            // Toggle user menu
            if (userMenu.classList.contains('show')) {
                userMenu.classList.remove('show');
            } else {
                userMenu.classList.add('show');
            }
        };
    }
}

function setupSidebarDropdowns() {
    // Admin
    const adminToggle = document.getElementById('adminDropdownToggle');
    const adminMenu = document.getElementById('adminSubmenu');
    const adminArrow = document.getElementById('adminArrow');
    
    if (adminToggle && adminMenu && adminArrow) {
        adminToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebarMenu(adminMenu, adminArrow);
        };
    }
    
    // Accounts
    const accountsToggle = document.getElementById('accountsDropdownToggle');
    const accountsMenu = document.getElementById('accountsSubmenu');
    const accountsArrow = document.getElementById('accountsArrow');
    
    if (accountsToggle && accountsMenu && accountsArrow) {
        accountsToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebarMenu(accountsMenu, accountsArrow);
        };
    }
    
    // Exchange
    const exchangeToggle = document.getElementById('exchangeDropdownToggle');
    const exchangeMenu = document.getElementById('exchangeSubmenu');
    const exchangeArrow = document.getElementById('exchangeArrow');
    
    if (exchangeToggle && exchangeMenu && exchangeArrow) {
        exchangeToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebarMenu(exchangeMenu, exchangeArrow);
        };
    }
    
    // Inventory
    const inventoryToggle = document.getElementById('inventoryDropdownToggle');
    const inventoryMenu = document.getElementById('inventorySubmenu');
    const inventoryArrow = document.getElementById('inventoryArrow');
    
    if (inventoryToggle && inventoryMenu && inventoryArrow) {
        inventoryToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebarMenu(inventoryMenu, inventoryArrow);
        };
    }
    
    // Orders
    const ordersToggle = document.getElementById('ordersDropdownToggle');
    const ordersMenu = document.getElementById('ordersSubmenu');
    const ordersArrow = document.getElementById('ordersArrow');
    
    if (ordersToggle && ordersMenu && ordersArrow) {
        ordersToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebarMenu(ordersMenu, ordersArrow);
        };
    }
    
    // Reports
    const reportsToggle = document.getElementById('reportsDropdownToggle');
    const reportsMenu = document.getElementById('reportsSubmenu');
    const reportsArrow = document.getElementById('reportsArrow');
    
    if (reportsToggle && reportsMenu && reportsArrow) {
        reportsToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebarMenu(reportsMenu, reportsArrow);
        };
    }
    
    // Export dropdown
    const exportToggle = document.getElementById('exportDropdownToggle');
    const exportMenu = document.getElementById('exportDropdown');
    
    if (exportToggle && exportMenu) {
        exportToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Export dropdown clicked!');
            
            // Close all other dropdowns first
            closeAllSidebarMenus();
            closeUserDropdown();
            
            // Toggle export menu
            if (exportMenu.classList.contains('show')) {
                exportMenu.classList.remove('show');
            } else {
                exportMenu.classList.add('show');
            }
        };
    }
}

function toggleSidebarMenu(menu, arrow) {
    // Check if current menu is already open
    const isCurrentlyOpen = !menu.classList.contains('hidden');
    
    // Close all other sidebar menus first
    closeAllSidebarMenus();
    
    // Toggle current menu
    if (isCurrentlyOpen) {
        // If it was open, close it
        menu.classList.add('hidden');
        arrow.classList.remove('rotated');
    } else {
        // If it was closed, open it
        menu.classList.remove('hidden');
        arrow.classList.add('rotated');
    }
}

function setupOutsideClick() {
    document.onclick = function(e) {
        // Close user dropdown if clicking outside
        const userMenu = document.getElementById('userDropdown');
        const userToggle = document.getElementById('userDropdownToggle');
        if (userMenu && userToggle && !userToggle.contains(e.target) && !userMenu.contains(e.target)) {
            userMenu.classList.remove('show');
        }
        
        // Close export dropdown if clicking outside
        const exportMenu = document.getElementById('exportDropdown');
        const exportToggle = document.getElementById('exportDropdownToggle');
        if (exportMenu && exportToggle && !exportToggle.contains(e.target) && !exportMenu.contains(e.target)) {
            exportMenu.classList.remove('show');
        }
        
        // Close sidebar menus if clicking outside nav
        if (!e.target.closest('nav')) {
            closeAllSidebarMenus();
        }
    };
}

function closeAllSidebarMenus() {
    const menus = [
        { menu: 'adminSubmenu', arrow: 'adminArrow' },
        { menu: 'accountsSubmenu', arrow: 'accountsArrow' },
        { menu: 'exchangeSubmenu', arrow: 'exchangeArrow' },
        { menu: 'inventorySubmenu', arrow: 'inventoryArrow' },
        { menu: 'ordersSubmenu', arrow: 'ordersArrow' },
        { menu: 'reportsSubmenu', arrow: 'reportsArrow' }
    ];
    
    menus.forEach(function(item) {
        const menu = document.getElementById(item.menu);
        const arrow = document.getElementById(item.arrow);
        if (menu && arrow) {
            menu.classList.add('hidden');
            arrow.classList.remove('rotated');
        }
    });
}

function closeUserDropdown() {
    const userMenu = document.getElementById('userDropdown');
    if (userMenu) {
        userMenu.classList.remove('show');
    }
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

    // Simple toggle function for inline onclick (backup)
    window.toggleUserDropdown = function() {
        var userDropdown = document.getElementById('userDropdown');
        if (userDropdown) {
            userDropdown.classList.toggle('show');
            console.log('Dropdown toggled! Show class:', userDropdown.classList.contains('show'));
        } else {
            console.error('User dropdown not found!');
        }
    };

    // Debug function to test all dropdowns
    window.testAllDropdowns = function() {
        console.log('=== TESTING ALL DROPDOWNS ===');
        
        // Test user dropdown
        const userToggle = document.getElementById('userDropdownToggle');
        const userMenu = document.getElementById('userDropdown');
        console.log('User toggle exists:', !!userToggle);
        console.log('User menu exists:', !!userMenu);
        if (userMenu) {
            console.log('User menu classes:', userMenu.className);
            console.log('User menu has show class:', userMenu.classList.contains('show'));
        }
        
        // Test admin dropdown
        const adminToggle = document.getElementById('adminDropdownToggle');
        const adminMenu = document.getElementById('adminSubmenu');
        console.log('Admin toggle exists:', !!adminToggle);
        console.log('Admin menu exists:', !!adminMenu);
        if (adminMenu) {
            console.log('Admin menu classes:', adminMenu.className);
            console.log('Admin menu has hidden class:', adminMenu.classList.contains('hidden'));
        }
        
        // Test CSS
        const testDiv = document.createElement('div');
        testDiv.className = 'dropdown-menu show';
        testDiv.style.position = 'absolute';
        testDiv.style.top = '100px';
        testDiv.style.left = '100px';
        testDiv.style.width = '200px';
        testDiv.style.height = '100px';
        testDiv.style.backgroundColor = 'red';
        testDiv.textContent = 'TEST DROPDOWN';
        document.body.appendChild(testDiv);
        setTimeout(() => {
            document.body.removeChild(testDiv);
            console.log('Test dropdown created and removed');
        }, 2000);
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