#!/bin/bash

# Get local IP addresses for mobile testing
echo "🔍 Finding your local IP addresses for mobile testing..."
echo ""

# Windows IP detection
if command -v ipconfig &> /dev/null; then
    echo "📱 WiFi/Ethernet IP addresses found:"
    ipconfig | grep -E "IPv4 Address.*: (192\.168\.|10\.)" | head -3
fi

# Linux/Mac IP detection  
if command -v ifconfig &> /dev/null; then
    echo "📱 Network interfaces found:"
    ifconfig | grep -E "inet (192\.168\.|10\.)" | head -3
fi

# Alternative method for all systems
if command -v hostname &> /dev/null; then
    echo ""
    echo "🌐 Hostname IP:"
    hostname -I 2>/dev/null || hostname
fi

echo ""
echo "📋 To test on mobile device:"
echo "1. Make sure your phone is on the same WiFi network"
echo "2. Use one of the IP addresses above instead of 'localhost'"
echo "3. Frontend: http://[IP_ADDRESS]:3000 or :3001"
echo "4. Backend: http://[IP_ADDRESS]:5000"
echo ""
echo "Example: http://192.168.1.100:3000"