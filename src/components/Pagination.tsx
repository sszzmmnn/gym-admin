import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";

import useApiPath from "../hooks/useApiPath";

const Pagination = (props: {docCount: number}) => {
  const { docCount } = props;
  const { apiPath, setApiPath } = useApiPath();

  const getPagination = () => {
    const pages: number[] = [];
    const selectedPage = apiPath.page || 1;

    const limit = Math.ceil(docCount / 20);
    let c = 0;
    do {
      c++;
      pages.push(c);
    } while (c < limit);
    
    const visiblePages: number[] = [];

    let replaced = false;
    pages.forEach((page, i) => {
      if(Math.abs(page - selectedPage) <= 2 || i === 0 || i === pages.length - 1) {
        replaced = false;
        visiblePages.push(page);
      } else if (!replaced) {
        replaced = true;
        visiblePages.push(0);
      }
    })

    const handleNewPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, page: number) => {
      if(page === 0) return;

      const btn = e.currentTarget;
      btn.setAttribute('disabled', '');
      setApiPath(prev => (
        {
          ...prev,
          page: page
        }
      ));

      btn.removeAttribute('disabled');
    }

    return visiblePages.map((page, i) => (
        <IconButton key={i}
          variant={page === 0 ? 'plain' : page === selectedPage ? 'solid' : 'outlined'} 
          color={page === selectedPage ? 'primary' : 'neutral'}
          sx={{borderRadius: '50%'}}
          onClick={(e) => handleNewPage(e, page)}>
            {page === 0 ? '...' : page}
          </IconButton>
      ))
  }

  return (docCount > 20) &&
    <Box sx={{display: 'flex', gap: 1, justifyContent: 'center'}}>
      {getPagination()}
    </Box>
}

export default Pagination