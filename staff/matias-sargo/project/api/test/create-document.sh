curl -X POST http://localhost:8080/documents \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNjOTUyM2ZjOTY2NDc5NWFlNWMzOTIiLCJpYXQiOjE3MjQ5NDEzNjZ9.ozRCEAFi_pOecTwCVEng2ejSSeaFT8_kiCPWY15Zt7w" \
    -F "propertyId=66d023a8c0f08dba8ff88ecd" \
    -F "type=contract" \
    -F "url=https://drive.google.com/file/d/1WKxd6Nlursd9ZIEPh-hykScsbpAcRKSN/view?usp=sharing" \
    -F "content=@"C:/Users/matia/OneDrive/Desktop/contract.pdf""