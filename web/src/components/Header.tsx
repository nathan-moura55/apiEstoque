export const Header = () => {
  return (
    <header style={{ 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '15px', 
      padding: '2%', 
      backgroundColor: '#181a1b', 
      borderBottom: '1px solid #000',
      marginBottom: '30px'
    }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" /> 
        <path d="M12 22V12" />
      </svg>
      <h1 style={{ margin: 0, textTransform: 'uppercase', fontWeight: 'normal', fontSize: '1.5rem', letterSpacing: '2px', color:'#fafafa' }}>
        Fluxo
      </h1>
    </header>
  );
};