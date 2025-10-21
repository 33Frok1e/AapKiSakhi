// Initialize Lucide icons
lucide.createIcons();

// Sidebar and Header functionality
let sidebarCollapsed = false;
let userDropdownOpen = false;
let openMenus = ["Dashboard"];

function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const iconLeft = document.getElementById('sidebar-icon-left');
    const iconRight = document.getElementById('sidebar-icon-right');

    if (window.innerWidth >= 1024) {
        // Desktop: toggle mini mode
        if (sidebar.classList.contains('sidebar-mini')) {
            sidebar.classList.remove('sidebar-mini');
            iconLeft.classList.remove('hidden');
            iconRight.classList.add('hidden');
        } else {
            sidebar.classList.add('sidebar-mini');
            iconLeft.classList.add('hidden');
            iconRight.classList.remove('hidden');
        }
        return;
    }

    // Mobile behavior
    if (sidebarCollapsed) {
        sidebar.classList.remove('sidebar-open');
        sidebar.classList.add('sidebar-collapsed');
        overlay.classList.add('hidden');
    } else {
        sidebar.classList.remove('sidebar-collapsed');
        sidebar.classList.add('sidebar-open');
        if (window.innerWidth < 1024) {
            overlay.classList.remove('hidden');
        }
    }
}

function toggleUserDropdown() {
    userDropdownOpen = !userDropdownOpen;
    const dropdown = document.getElementById('user-dropdown');
    
    if (userDropdownOpen) {
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
}

function toggleMenu(menuName) {
    const menuId = menuName.toLowerCase() + '-menu';
    const chevronId = menuName.toLowerCase() + '-chevron';
    const menu = document.getElementById(menuId);
    const chevron = document.getElementById(chevronId);
    
    if (openMenus.includes(menuName)) {
        openMenus = openMenus.filter(item => item !== menuName);
        menu.classList.add('hidden');
        chevron.classList.remove('rotate-180');
    } else {
        openMenus.push(menuName);
        menu.classList.remove('hidden');
        chevron.classList.add('rotate-180');
    }
}

function changePassword() {
    userDropdownOpen = false;
    document.getElementById('user-dropdown').classList.add('hidden');
    alert("Change Password functionality would be implemented here");
}

function logout() {
    userDropdownOpen = false;
    document.getElementById('user-dropdown').classList.add('hidden');
    if (confirm("Are you sure you want to logout?")) {
        alert("Logout successful! Redirecting to login page...");
        // In a real app, this would redirect to login page
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const userDropdown = document.getElementById('user-dropdown');
    const userButton = event.target.closest('button[onclick="toggleUserDropdown()"]');
    
    if (!userButton && userDropdown && !userDropdown.contains(event.target)) {
        userDropdownOpen = false;
        userDropdown.classList.add('hidden');
    }
});

// Handle window resize for mobile overlay
window.addEventListener('resize', function() {
    const overlay = document.getElementById('mobile-overlay');
    if (window.innerWidth >= 1024) {
        overlay.classList.add('hidden');
    } else if (!sidebarCollapsed) {
        overlay.classList.remove('hidden');
    }
});

// Set user name from localStorage or default
document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.getElementById('user-name');
    // Respect manual value if present; else fallback to localStorage
    if (!nameElement.textContent || nameElement.textContent.trim().length === 0 || nameElement.textContent.trim().toLowerCase() === 'user') {
        const userName = localStorage.getItem('userName') || nameElement.textContent || 'User';
        nameElement.textContent = userName;
    }
});

// Data
const goldRates = [
    { karat: "24K", rate: 11433, change: "+0.5%" },
    { karat: "22K", rate: 10480, change: "+0.4%" },
    { karat: "20K", rate: 9528, change: "+0.3%" },
    { karat: "18K", rate: 8575, change: "+0.2%" },
    { karat: "16K", rate: 7622, change: "+0.2%" },
    { karat: "14K", rate: 6669, change: "+0.1%" },
    { karat: "12K", rate: 5716, change: "+0.1%" },
];

const categories = [
    { value: "rings", label: "Rings" },
    { value: "necklaces", label: "Necklaces" },
    { value: "earrings", label: "Earrings" },
    { value: "bracelets", label: "Bracelets" },
];

const items = {
    rings: [
        { value: "diamond-ring", label: "Diamond Ring" },
        { value: "gold-band", label: "Gold Band" },
    ],
    necklaces: [
        { value: "pearl-necklace", label: "Pearl Necklace" },
        { value: "gold-chain", label: "Gold Chain" },
    ],
    earrings: [
        { value: "stud-earrings", label: "Stud Earrings" },
        { value: "hoop-earrings", label: "Hoop Earrings" },
    ],
    bracelets: [
        { value: "tennis-bracelet", label: "Tennis Bracelet" },
        { value: "charm-bracelet", label: "Charm Bracelet" },
    ],
};

// State
let activeTab = "current-rate";
let selectedCategory = "";
let selectedItem = "";
let historyDate = "";
let todayRate = "";

// Calculator data
const calculatorData = {
    weight: 15.50,
    rate: 10480,
    discount: 5,
};

// Tab functionality
function setActiveTab(tabName) {
    // Hide all sections
    document.getElementById('current-rate-section').classList.add('hidden');
    document.getElementById('calculator-section').classList.add('hidden');
    document.getElementById('history-section').classList.add('hidden');
    document.getElementById('set-rate-section').classList.add('hidden');

    // Remove active class from all tabs
    document.querySelectorAll('[id^="tab-"]').forEach(tab => {
        tab.classList.remove('bg-blue-600', 'text-white');
        tab.classList.add('bg-white', 'text-gray-900', 'hover:bg-gray-100');
    });

    // Show selected section
    document.getElementById(`${tabName}-section`).classList.remove('hidden');

    // Add active class to selected tab
    const activeTabElement = document.getElementById(`tab-${tabName}`);
    activeTabElement.classList.remove('bg-white', 'text-gray-900', 'hover:bg-gray-100');
    activeTabElement.classList.add('bg-blue-600', 'text-white');

    activeTab = tabName;
}

// Category change handler
function handleCategoryChange() {
    const categorySelect = document.getElementById('category-select');
    const itemSelect = document.getElementById('item-select');
    
    selectedCategory = categorySelect.value;
    selectedItem = "";
    
    // Reset item select
    itemSelect.innerHTML = '<option value="" disabled selected hidden></option>';
    itemSelect.disabled = true;
    
    if (selectedCategory && items[selectedCategory]) {
        itemSelect.disabled = false;
        items[selectedCategory].forEach(item => {
            const option = document.createElement('option');
            option.value = item.value;
            option.textContent = item.label;
            itemSelect.appendChild(option);
        });
    }
    
    // Hide calculator content
    document.getElementById('calculator-content').classList.add('hidden');
}

// Item change handler
function handleItemChange() {
    const itemSelect = document.getElementById('item-select');
    selectedItem = itemSelect.value;
    
    if (selectedItem) {
        document.getElementById('calculator-content').classList.remove('hidden');
    } else {
        document.getElementById('calculator-content').classList.add('hidden');
    }
}

// History date change handler
function handleHistoryDateChange() {
    const historyDateInput = document.getElementById('history-date');
    historyDate = historyDateInput.value;
    
    if (historyDate) {
        document.getElementById('history-content').classList.remove('hidden');
    } else {
        document.getElementById('history-content').classList.add('hidden');
    }
}

// Update rate function
function showToast(message) {
    // simple inline toast
    let toast = document.getElementById('inline-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'inline-toast';
        toast.className = 'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-elegant text-white bg-green-600';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.transition = 'opacity 300ms ease';
        toast.style.opacity = '0';
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 1800);
}

function updateRate() {
    const rateInput = document.getElementById('today-rate');
    todayRate = rateInput.value;
    
    if (todayRate) {
        showToast('Gold rate updated successfully');
        rateInput.value = "";
    } else {
        alert("Please enter a valid rate");
    }
}

// Calculate total function
function calculateTotal() {
    const weight = calculatorData.weight;
    const rate = calculatorData.rate;
    const discount = calculatorData.discount;
    const amount = weight * rate;
    const discountAmount = (amount * discount) / 100;
    const totalAmount = amount - discountAmount;
    const gst = (totalAmount * 3) / 100;
    const netPayable = totalAmount + gst;

    return { amount, totalAmount, gst, netPayable };
}

// Update calculator display
function updateCalculatorDisplay() {
    const { amount, totalAmount, gst, netPayable } = calculateTotal();
    
    // Update the amount in the table
    const amountElement = document.querySelector('#calculator-content .text-blue-600');
    if (amountElement) {
        amountElement.textContent = `₹${amount.toFixed(2)}`;
    }
    
    // Update summary values
    const totalAmountElement = document.querySelector('#calculator-content .text-2xl.font-bold.text-blue-600');
    if (totalAmountElement) {
        totalAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
    }
    
    // Update GST
    const gstElements = document.querySelectorAll('#calculator-content .text-2xl.font-bold.text-blue-600');
    if (gstElements.length > 1) {
        gstElements[1].textContent = `₹${gst.toFixed(2)}`;
    }
    
    // Update net payable
    const netPayableElement = document.querySelector('#calculator-content .text-3xl.font-extrabold.text-green-600');
    if (netPayableElement) {
        netPayableElement.textContent = `₹${netPayable.toFixed(2)}`;
    }
}

// Initialize calculator display
updateCalculatorDisplay();

// Initialize floating labels
function initializeFloatingLabels() {
    const setupFloatingSelect = (selectId) => {
        const sel = document.getElementById(selectId);
        if (!sel) return;
        const lbl = document.querySelector('label[for="' + selectId + '"]');
        if (!lbl) return;

        const update = () => {
            if (sel.value && sel.value !== "") {
                lbl.classList.add('floated');
            } else {
                lbl.classList.remove('floated');
            }
        };

        update();
        sel.addEventListener('change', update);
        sel.addEventListener('input', update);
        sel.addEventListener('focus', () => lbl.classList.add('floated'));
        sel.addEventListener('blur', update);
    };

    // Inputs keep prior behavior
    const floatingInputs = document.querySelectorAll('.floating-input input');
    floatingInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.nextElementSibling.classList.add('transform', '-translate-y-6', 'scale-75', 'text-blue-600');
        });
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.nextElementSibling.classList.remove('transform', '-translate-y-6', 'scale-75', 'text-blue-600');
            }
        });
        if (input.value) {
            input.nextElementSibling.classList.add('transform', '-translate-y-6', 'scale-75', 'text-blue-600');
        }
    });

    // Setup our two selects
    setupFloatingSelect('category-select');
    setupFloatingSelect('item-select');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeFloatingLabels();
    
    // Initialize gold rate cards with proper values
    const goldRateCards = document.querySelectorAll('.gold-rate-card');
    goldRateCards.forEach((card, index) => {
        if (goldRates[index]) {
            const rate = goldRates[index];
            const rateElement = card.querySelector('.text-3xl');
            const karatElement = card.querySelector('.text-sm.font-semibold');
            
            if (rateElement) {
                rateElement.textContent = rate.rate.toLocaleString();
            }
            if (karatElement) {
                karatElement.textContent = `Gold : ${rate.karat}`;
            }
        }
    });
});