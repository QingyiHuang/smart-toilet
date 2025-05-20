import http from '@/core/httpInstance2';
export default {
  getMapConfig() {
    return http.post({ url: '/ocos/ui/xmap/config' });
  }
};
