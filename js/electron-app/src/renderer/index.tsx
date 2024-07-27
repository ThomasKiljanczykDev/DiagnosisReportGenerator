import ReactDOM from 'react-dom/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import App from '@diagnosis-report-generator/react-app/App'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

postMessage({ payload: 'removeLoading' }, '*');
